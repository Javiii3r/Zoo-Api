const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
    
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        code: statusCode,
        title: "internal-server-error",
        message: err.message || "Ha ocurrido un error inesperado en el servidor"
    });
};

module.exports = errorHandler;