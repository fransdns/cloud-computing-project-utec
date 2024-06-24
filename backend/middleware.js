// Middleware para verificar el tipo de usuario y la autenticación
const checkUserType = (type) => {
    return (req, res, next) => {
      // Verificar si el usuario está autenticado y tiene el tipo de usuario correcto
      if (req.headers['tipo'] && req.headers['tipo'].toLowerCase() === 'laprincesa' ) {
        next(); // Usuario tiene el tipo necesario, continúa con la siguiente función
      } else {
        // Manejar caso de usuario no autenticado
        if (!req.user) {
          res.status(401).json({ error: 'Debes iniciar sesión para acceder a esta función' });
        } else {
          res.status(403).json({ error: 'No tienes permisos suficientes para realizar esta acción' });
        }
      }
    };
  };

  export default checkUserType;