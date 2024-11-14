import jwt from 'jsonwebtoken';

class AuthMiddleware {
  constructor(secret) {
    if (!secret) {
      throw new Error('JWT secret is required');
    }
    this.secret = secret;
  }

  // Middleware para extrair o token do cookie
  extractToken = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token não fornecido' });
    }

    try {
      // Decodifica e verifica o token
      const decoded = jwt.verify(token, this.secret);
      req.token_data = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido',
      });
    }
  };

  // Middleware para verificar se o token é válido
  verifyToken = (req, res, next) => {
    if (!req.token_data) {
      return res.status(401).json({ success: false, message: 'Token não fornecido' });
    }
    next();
  };

  // Middleware para verificar permissões
  checkPermissions = (requiredPermissions) => {
    return (req, res, next) => {
      const userPermissions = req.token_data?.permissions;

      if (!userPermissions || !Array.isArray(userPermissions)) {
        return res.status(403).json({ success: false, message: 'Acesso negado. Permissões não encontradas.' });
      }

      // Verifica se o usuário possui alguma das permissões necessárias
      const hasRequiredPermission = requiredPermissions.some((permission) => userPermissions.includes(permission));

      if (hasRequiredPermission) {
        next();
      } else {
        return res.status(403).json({ success: false, message: 'Acesso negado. Permissões insuficientes.' });
      }
    };
  };
}

export default AuthMiddleware;
