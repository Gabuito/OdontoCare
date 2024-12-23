import loginAPI from './api.login.router.js';
// import clientAPI from './api.client.router.js';
// import employeeAPI from './api.employee.router.js';
// import protocolAPI from './api.protocol.router.js';
// import stockAPI from './api.stock.router.js';
import uploadAPI from './api.upload.router.js';
import { Router } from 'express';

const api = Router();

api.use(loginAPI);
api.use(uploadAPI);

export default api;