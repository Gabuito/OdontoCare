import { Router } from 'express';
import loginController from '../../controllers/login.controller.js';
const api = Router();

api.post('/v1/users/create', 
  loginController.register
);

api.post('/v1/users/login', 
  loginController.login
);

api.get('/v1/users/gettoken', 
  loginController.token
);  


export default api;