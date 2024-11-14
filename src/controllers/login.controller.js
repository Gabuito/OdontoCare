import jwt from 'jsonwebtoken';
import timestamp from '../services/timestamp.services.js';
import database from '../utils/database.js';
import workerDB from '../services/database.services.js';
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import { SanitizeData } from '../services/sanitize.services.js';
import { hashPassword, comparePassword } from '../services/password.services.js';


class LoginController {

  async token(req, res) {

    res.status(200).json({
      token:{data: req.token_data}
    });

  }
    


  async login(req, res) {
    try {
      const { email, password } = req.body;

      workerDB.database = database;
      let conn = await workerDB.beginTransaction();
      const user = await workerDB.readByColumn('tb_client', 'client_email', email, conn);
      await workerDB.commitTransaction(conn);
      const compared = await comparePassword(password, user[0].client_password);

      
      if (user && compared ) {

      conn = await workerDB.beginTransaction();
      const employee = await workerDB.readByColumn('tb_employee', 'employee_uuid', user[0].client_uuid, conn);
      await workerDB.commitTransaction(conn);

      var token;

      if (employee.length > 0) {
        conn = await workerDB.beginTransaction();
        const role = await workerDB.readByColumn('tb_role', 'role_id', employee[0].role_id, conn);
        await workerDB.commitTransaction(conn);
        
          token = jwt.sign({userId: employee[0].employee_uuid.toString('hex'), role: role[0].role_acronym, permissions: role[0].role_permissions }, process.env.JWT_SECRET || JWT_SECRET, {
          expiresIn: 86400,
        });
      }else{
          token = jwt.sign({userId: user[0].client_uuidtoString('hex')}, process.env.JWT_SECRET || JWT_SECRET, {
          expiresIn: 86400,
        });
      }
        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ? true : false,
          sameSite: 'None',
          maxAge: 86400000,
        });

        res.status(200).json({
          success: true,
          message: 'Autenticação realizada com sucesso',
          data: {
            userId: user[0].client_uuid.toString('hex'),
            auth: {
              expiresIn: 86400
            },
            links: {
              self: '/api/v1/auth/login',
              profile: `/api/v1/users/${user[0].client_uuid.toString('hex')}`,
              logout: '/api/v1/auth/logout'
            }
          },
          metadata: {
            apiVersion: '1.0',
            timestamp: timestamp()
          }
        });

      } else {
        res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos',
          data: {},
          metadata: {
            apiVersion: '1.0',
            timestamp: timestamp()
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: {},
        metadata: {
          apiVersion: '1.0',
          timestamp: timestamp()
        }
      });
    }
  }

  async register(req, res) {
    let conn;

    try {
      const { name, email, password, cpf, birthDate, plan, phone, price } = req.body;
      const address = req.body.address;

      const uuidBytes = Buffer.from(uuidParse(uuidv4()));

      const clientData = {
        client_uuid: uuidBytes,
        client_name: SanitizeData.sanitizeName(name),
        client_email: SanitizeData.sanitizeEmail(email),
        client_password: await hashPassword(password),
        client_cpf: SanitizeData.sanitizeCPF(cpf),
        client_phone: SanitizeData.sanitizePhone(phone),
        client_address: address.address,
        client_city: address.city,
        client_state: address.state,
        client_zip_code: address.zipCode,
        client_country: address.country,
        client_birth_date: birthDate,
        client_plan: plan,
        client_plan_price: SanitizeData.sanitizePrice(price),
        client_status: 'ATIVO',
      };

      workerDB.database = database;
      conn = await workerDB.beginTransaction();
      await workerDB.create('tb_client', clientData, conn);
      await workerDB.commitTransaction(conn);

      const response = {
        public_id: uuidBytes.toString('hex'),
        name: SanitizeData.sanitizeName(name),
        email: email,
        cpf: SanitizeData.formatCPF(cpf)
      };

      res.status(201).json({
        success: true,
        message: 'Cliente registrado com sucesso',
        data: response,
        metadata: {
          apiVersion: '1.0',
          timestamp: timestamp()
        }
      });

    } catch (error) {
      console.error('Erro no registro:', error);
      if (conn) {
        await workerDB.rollbackTransaction(conn);
      }
      if (error.message.includes('ER_DUP_ENTRY')) {
        return res.status(400).json({
          success: false,
          message: 'Email ou CPF já cadastrado',
          data: {},
          metadata: {
            apiVersion: '1.0',
            timestamp: timestamp()
          }
        });
      }
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: error.message,
          data: {},
          metadata: {
            apiVersion: '1.0',
            timestamp: timestamp()
          }
        });
      }
      res.status(500).json({
        success: false,
        message: 'Erro interno no servidor',
        data: {},
        metadata: {
          apiVersion: '1.0',
          timestamp: timestamp()
        }
      });
    }
  }
}

export default new LoginController();