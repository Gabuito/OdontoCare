import { Router } from 'express';
import Auth from '../../middlewares/auth.middleware.js';
import loginController from '../../controllers/login.controller.js';
const api = Router();
const auth = new Auth(process.env.JWT_SECRET || JWT_SECRET);

api.post('/v1/users/create', 
  loginController.register
);

api.post('/v1/users/login', 
  loginController.login
);

api.get('/v1/users/gettoken',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['create_protocols']),
  loginController.token
);  


export default api;