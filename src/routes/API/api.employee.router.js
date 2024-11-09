import { Router } from 'express';
import Auth from '../../middlewares/auth.middleware.js';

const auth = new Auth(process.env.JWT_SECRET || JWT_SECRET);
const api = Router();


api.get('/v1/employees',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_employees_any']), 
  employee.list()
);

api.get('/v1/employees/:id',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['read_employees_any','read_employees_own']), 
  employee.listById()
);

api.post('/v1/employees/create',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['create_employees','create_employees_own']), 
  employee.create()
);

api.put('/v1/employees/:id/update',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['update_employees_any','update_employees_own']), 
  employee.update()
);

api.delete('/v1/employees/:id/delete',
  auth.extractToken,
  auth.verifyToken,
  auth.checkPermissions(['delete_employees_any','delete_employees_own']), 
  employee.delete()
);

export default api;