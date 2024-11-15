import { Router } from 'express';
import webRouter from './http.web.router.js';
import dashRouter from './http.dash.router.js';

const gateway = Router();

gateway.use(webRouter);
gateway.use(dashRouter);

export default gateway;
