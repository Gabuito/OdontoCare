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

api.get('/v1/profile/:id', auth.token(), profile.listById());
api.put('/v1/profile/update/:id', auth.token(), profile.update());
api.delete('/v1/profile/delete/:id', auth.token(), profile.delete());

api.get('/v1/employees/:id', auth.token(), employee.listById());
api.get('/v1/employees', auth.token(), employee.list());
api.post('/v1/employees/create', auth.token(), employee.create());
api.put('/v1/employees/update/:id', auth.token(), employee.update());
api.delete('/v1/employees/delete/:id', auth.token(), employee.delete());

api.get('/v1/materials/:id', auth.token(), material.listById());
api.get('/v1/materials', auth.token(), material.list());
api.post('/v1/materials/create', auth.token(), material.create());
api.put('/v1/materials/update/:id', auth.token(), material.update());
api.delete('/v1/materials/delete/:id', auth.token(), material.delete());

api.get('/v1/protocols/:id', auth.token(), protocol.listById());    
api.get('/v1/protocols', auth.token(), protocol.list());
api.post('/v1/protocols/create', auth.token(), protocol.create());
api.put('/v1/protocols/update/:id', auth.token(), protocol.update());
api.delete('/v1/protocols/delete/:id', auth.token(), protocol.delete());


api.get('/v2/protocols/:id/employee', auth.token(), protocol.listEmployeebyProtocols());
api.get('/v2/protocols/:id/materials', auth.token(), protocol.listMaterialsbyProtocols());
api.get('/v2/protocols/:id/description', auth.token(), protocol.descriptionbyProtocols());
api.get('/v2/protocols/:id/date', auth.token(), protocol.listDatebyProtocols());
api.get('/v2/protocols/:id/user', auth.token(), protocol.listUserbyProtocols());

