import { Router } from 'express';
import loginController from '../../controllers/login.controller.js';
const api = Router();

api.post('/v1/users/create', 
  loginController.register()
);

export default api;