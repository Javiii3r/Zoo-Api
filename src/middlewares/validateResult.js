/**
 * MIDDLEWARE DE VALIDACIÓN DE RESULTADOS
 * ========================================
 * Procesa errores de validación de express-validator
 * Se usa en las cadenas de validadores de POST y PUT
 */

const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        // Si hay errores de validación, lanza una excepción
        validationResult(req).throw();
        // Si no hay errores, continúa al siguiente middleware
        return next();
    } catch (err) {
        // Retorna 400 Bad Request con array detallado de errores
        res.status(400).json({
            code: 400,
            title: "bad-request",
            errors: err.array()  // Array con detalles de cada error de validación
        });
    }
};

module.exports = { validateResult };