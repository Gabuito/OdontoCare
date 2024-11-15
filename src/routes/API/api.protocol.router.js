import { Router } from 'express';
import Auth from '../../middlewares/auth.middleware.js';
import protocol from '../../controllers/API/protocol.controller.js';
const api = Router();
const auth = new Auth(process.env.JWT_SECRET || JWT_SECRET);

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
