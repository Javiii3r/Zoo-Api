/**
 * MIDDLEWARE DE MANEJO DE ERRORES
 * ================================
 * Middleware global que captura excepciones no controladas
 * Debe registrarse al final de la stack de middlewares
 */

const errorHandler = (err, req, res, next) => {
    // Loguea el error completo en consola para debugging
    console.error(err.stack); 
    
    // Usa statusCode del error, por defecto 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    // Retorna respuesta JSON estandarizada
    res.status(statusCode).json({
        code: statusCode,
        title: "internal-server-error",
        message: err.message || "Ha ocurrido un error inesperado en el servidor"
    });
};

module.exports = errorHandler;