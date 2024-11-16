import { Router } from 'express';
import  httpController  from '../../controllers/HTTP/http.controller.js';
import loginController from '../../controllers/HTTP/login.controller.js';
const router = Router();

router.get('/', httpController.homepage()); 
router.get('/login', loginController.loginpage());
router.get('/create', loginController.createpage());
router.get('/test/:id', httpController.testview());


export default router;