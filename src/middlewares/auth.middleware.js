import jwt from 'jsonwebtoken';
import getRoles from '../services/database.roles.service.js';

class AuthMiddleware {
  constructor(secret) {
    if (!secret) {
      throw new Error('JWT secret is required');
    }
    this.secret = secret;
  }

  extractToken = (req, res, next) => {
    const token = req.cookies.authToken || req.headers.authorization;
    if (token) {
      req.token = token;
        next();
    }
    throw new Error('Token não fornecido');
}

  verifyToken = (req, res, next) => {
    try {
      const token = req.token

      if (!token) {
        return res.status(401).json({ success: false, message: 'Token não fornecido' });
      }

      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ 
            success: false, 
            message: err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido' 
          });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Erro de autenticação' });
    }
  };


  checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
      if (!req.user || !Array.isArray(req.user.permissions)) {
        return res.status(403).json({ success: false, message: 'Acesso negado. Permissões não encontradas.' });
      }

      if (requiredPermissions.some(permission => req.user.permissions.includes(permission))) {
        next();
      } else {
        return res.status(403).json({ success: false, message: 'Acesso negado. Permissões insuficientes.' });
      }
    };
  };
}

export default AuthMiddleware;