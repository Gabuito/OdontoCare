import { Router } from 'express';
import  httpController  from '../../controllers/http/httpController.js';

const router = Router();


router.get('/', httpController.homepage()); 
router.get('/login', httpController.loginpage());
router.get('/create', httpController.createpage());
router.get('/test/:id', httpController.testview());



export default router;