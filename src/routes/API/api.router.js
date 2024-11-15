import { Router } from 'express';
import Auth, {extractToken} from '../../middlewares/auth.middleware.js';

const auth = new Auth(process.env.JWT_SECRET || JWT_SECRET);
const api = Router();

api.get('/v1/users/:id',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_users_any','read_users_own']), 
  user.listById()
);




api.get('/v1/materials/:id', auth.token(), material.listById());
api.get('/v1/materials', auth.token(), material.list());
api.post('/v1/materials/create', auth.token(), material.create());
api.put('/v1/materials/update/:id', auth.token(), material.update());
api.delete('/v1/materials/delete/:id', auth.token(), material.delete());


