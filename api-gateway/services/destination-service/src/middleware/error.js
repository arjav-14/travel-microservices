const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value || 'unknown'}`;
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: message
        });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: message
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: message
        });
    }

    // Default error
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
