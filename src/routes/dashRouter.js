import {Router} from 'express';
import logMiddleware from '../middlewares/logMiddleware.js';
import * as worker from '../utils/worker.database.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import dashController from '../controllers/dashController.js';

const router = Router();

//Routa Dashboard Default
router.get('/', logMiddleware.log(), authMiddleware.handle(logMiddleware.internalLog), dashController.handle(logMiddleware.internalLog), logMiddleware.error());

