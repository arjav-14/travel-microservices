const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ 
                success: false,
                message: 'No token, authorization denied' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(StatusCodes.UNAUTHORIZED).json({ 
            success: false,
            message: 'Token is not valid' 
        });
    }
};

exports.protect = auth;

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'User role is not authorized to access this route'
      });
    }
    next();
  };
};
