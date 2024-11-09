import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import workerDB from '../services/database.services.js';
import workerSanitize from '../services/sanitize.services.js';
import { hashPassword, comparePassword } from '../services/password.services.js';

class LoginController{

  // async login(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const user = await getPass(email);
  //     if (user && comparePassword(password, user.password)) {
  //       const token = jwt.sign({ email }, process.env.JWT_SECRET || JWT_SECRET, {
  //         expiresIn: 10000,
  //       });
  //       res.status(200).json({ token });
  //     } else {
  //       res.status(401).json({ message: 'Email ou senha inválidos' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async register(req, res) {
    let conn; 

    try {
        const { name, email, password, cpf, phone, address, city, state, zipCode, country, birthDate, plan } = req.body;
        
        const clientData = {
            name: workerSanitize.sanitizeName(name),
            email: workerSanitize.sanitizeEmail(email), 
            password: hashPassword(password),
            cpf: workerSanitize.sanitizeCPF(cpf),
            phone: workerSanitize.sanitizePhone(phone),
            address: address,
            city: city,
            state: state,
            zipCode: workerSanitize.sanitizeCEP(zipCode),
            country: country,
            birthDate: birthDate,
            plan: plan,
            status: 'Ativo'
        };
        const client = new Client(clientData);
        conn = await workerDB.beginTransaction();
        const newClient = await workerDB.create('tb_clients', client.toJson(), conn); 
        client.id = newClient.insertId; 
        await workerDB.commitTransaction(conn); 

        res.status(201).json({
            "status": 201,
            "httpStatus": "Created",
            "message": "Cliente registrado com sucesso",
            "success": true,
            "data": {
              "id": client.id,
              "name": clientData.name,
              "email": clientData.email,
              "plan": clientData.plan
            },
            "timestamp": Date.now().getTime()
         });


    } catch (error) {
        console.error('Erro no registro:', error);
        if (conn) {
            await workerDB.rollbackTransaction(conn);
        }
        if (error.message.includes('ER_DUP_ENTRY')) { 
            return res.status(400).json({ 
              'status': 400,
              'httpStatus': 'Bad Request',
              'message': 'Email ou CPF já cadastrado',
              'success': false,
              'data': {}
            });
        }
        if (error.name === 'ValidationError') { 
            return res.status(400).json({
              'status': 400,
              'httpStatus': 'Bad Request',
              'message': error.message,
              'success': false,
              'data': {}
            });
        }
        res.status(500).json({
            'status': 500,
            'httpStatus': 'Internal Server Error',
            'message': 'Erro interno no servidor',
            'success': false,
            'data': {}
        }); 
    }
};



}

export default new LoginController();