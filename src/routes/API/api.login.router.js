import { Router } from 'express';
import Auth from '../../middlewares/auth.middleware.js';
import loginController from '../../controllers/API/login.controller.js';
const api = Router();
const auth = new Auth(process.env.JWT_SECRET || JWT_SECRET);

api.post('/v1/users/create',
  loginController.register
);

api.post('/v1/users/login',
  auth.extractToken,
  loginController.login
);

api.post('/v1/users/logout',
  auth.extractToken,
  loginController.logout
);

export default api;