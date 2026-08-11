const jwt = require('jsonwebtoken');

function requireAuth(roles = []) {
  return function (req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'No autenticado. Inicia sesión de nuevo.' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ error: 'No tienes permiso para esta acción.' });
      }
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Sesión inválida o expirada.' });
    }
  };
}

module.exports = { requireAuth };
