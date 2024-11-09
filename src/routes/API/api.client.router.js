import { Router } from 'express';
import Auth from '../../middlewares/auth.middleware.js';

const auth = new Auth(process.env.JWT_SECRET || JWT_SECRET);
const api = Router();

api.get('/v1/users', 
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_users_any']), 
  user.list()
);

api.get('/v1/users/:id',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_users_any','read_users_own']), 
  user.listById()
);

api.post('/v1/users/create', 
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['create_users','create_users_own']), 
  user.create()
);

api.put('/v1/users/:id/update', 
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['update_users_any','update_users_own']), 
  user.update()
);

api.delete('/v1/users/:id/delete', 
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['delete_users_any','delete_users_own']), 
  user.delete()
);

api.get('/v1/users/:id/protocols',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_protocols_any','read_protocols_own']), 
  user.listProtocolsbyId()
);

api.post('/v1/users/:id/protocols/create', 
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['create_protocols','create_protocols_own']), 
  user.createProtocols()
);

api.put('/v1/users/:id/:idProtocols/update', 
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['update_protocols_any','update_protocols_own']),	 
  user.updateProtocols()
);

api.get('/v1/users/:id/:idProtocols/employee',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_employees_any','read_employees_own']), 
  user.listEmployeebyProtocols()
);


api.get('/v1/users/:id/:idProtocols/materials',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_materials_any','read_materials_own']), 
  user.listMaterialsbyProtocols()
);

api.get('/v1/users/:id/:idProtocols/description',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_description_any','read_description_own']), 
  user.descriptionbyProtocols()
);


export default api;