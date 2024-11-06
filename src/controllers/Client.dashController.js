import * as Controller from "./dashController";
import bcrypt from 'bcrypt';
import { validateInput, sanitizeInput } from './inputValidation';

class ClientController extends Controller {
    create(worker, cb) {
        return async (req, res, next) => {
            const logInfo = {
                level: "Controller Dashboard",
                application: "Client",
                inFunction: "Create User",
            };
            cb(logInfo);

            const { nome, cpf, email, telefone, plano, img, endereco, numero, cidade, estado, unidade, data_nascimento, senha } = req.body;

            // Validação de entrada
            if (!validateInput({ nome, cpf, email, telefone, plano, senha })) {
                return res.status(400).json({
                    title: "Dados inválidos",
                    status: 400,
                    detail: "Por favor, verifique os dados fornecidos",
                    instance: "/users"
                });
            }

            try {
                // Início da transação
                await worker.beginTransaction();

                // Verifica se o usuário já existe
                const existingUser = await worker.readByColumns("tb_cliente", "cl_cpf", cpf);
                if (existingUser.length > 0) {
                    await worker.rollbackTransaction();
                    return res.status(409).json({
                        title: "Usuário já existe",
                        status: 409,
                        detail: "Já existe uma conta para este usuário",
                        instance: "/users"
                    });
                }

                // Hash da senha
                const hashedPassword = await bcrypt.hash(senha, 10);

                // Criação do cliente
                await worker.create("tb_cliente", {
                    cl_nome: sanitizeInput(nome),
                    cl_cpf: sanitizeInput(cpf),
                    cl_email: sanitizeInput(email),
                    cl_telefone: sanitizeInput(telefone),
                    cl_status: "Ativo",
                    cl_datacadastro: new Date(),
                    cl_dataalteracao: new Date(),
                    cl_plano: sanitizeInput(plano),
                    cl_img: sanitizeInput(img),
                });

                // Criação dos dados adicionais
                await worker.create("tb_dado", {
                    dado_cpf: sanitizeInput(cpf),
                    dado_nome: sanitizeInput(nome),
                    dado_tipo: "Cliente",
                    dado_endereco: sanitizeInput(endereco),
                    dado_enderecoNumero: sanitizeInput(numero),
                    dado_cidade: sanitizeInput(cidade),
                    dado_estado: sanitizeInput(estado), 
                    dado_unidade: sanitizeInput(unidade),
                    dado_datanascimento: sanitizeInput(data_nascimento),
                });

                // Criação do login
                await worker.create("tb_login", {
                    login_email: sanitizeInput(email),
                    login_senha: hashedPassword
                });

                // Commit da transação
                await worker.commitTransaction();

                return res.status(201).json({
                    title: "Usuário criado",
                    status: 201,
                    detail: "Usuário criado com sucesso",
                    instance: "/users"
                });
            } catch (error) {
                await worker.rollbackTransaction();
                console.error('Erro ao criar usuário:', error);
                return res.status(500).json({
                    title: "Erro interno",
                    status: 500,
                    detail: "Ocorreu um erro ao processar a solicitação",
                    instance: "/users"
                });
            }
        };
    }

    read(worker, cb) {
        return async (req, res, next) => {
            cb({
                level: "Controller Dashboard",
                application: "Client",
                inFunction: "Read Users",
            });

            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const offset = (page - 1) * limit;

                const data = await worker.readAllPaginated("tb_cliente", limit, offset);
                const total = await worker.count("tb_cliente");

                return res.status(200).json({
                    data,
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                });
            } catch (error) {
                console.error('Erro ao ler usuários:', error);
                return res.status(500).json({
                    title: "Erro interno",
                    status: 500,
                    detail: "Ocorreu um erro ao processar a solicitação",
                    instance: "/users"
                });
            }
        }
    }

    readByColumn(worker, cb) {
        return async (req, res, next) => {
            cb({
                level: "Controller Dashboard",
                application: "Client",
                inFunction: "Read User By Column",
            });

            try {
                const clientData = await worker.readByColumn("tb_cliente", "cl_id", req.params.id);
                if (clientData.length === 0) {
                    return res.status(404).json({
                        title: "Usuário não encontrado",
                        status: 404,
                        detail: "Não foi possível encontrar o usuário especificado",
                        instance: `/users/${req.params.id}`
                    });
                }

                const additionalData = await worker.readByColumn("tb_dado", "dado_cpf", clientData[0].cl_cpf);
                const combinedData = { ...clientData[0], additionalData: additionalData[0] || {} };

                return res.status(200).json(combinedData);
            } catch (error) {
                console.error('Erro ao ler usuário:', error);
                return res.status(500).json({
                    title: "Erro interno",
                    status: 500,
                    detail: "Ocorreu um erro ao processar a solicitação",
                    instance: `/users/${req.params.id}`
                });
            }
        }
    }
}

export default new ClientController();