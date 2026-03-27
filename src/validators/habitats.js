/**
 * VALIDADORES DE HABITATS
 * =======================
 * Usa express-validator para validar datos en POST y PUT /habitats
 * Se monta como middleware en las rutas correspondientes
 */

const { check } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult');

/**
 * Constructor de validaciones para hábitats
 * Valida: nombre, clima
 */
const validateHabitat = [
    // NOMBRE: Obligatorio, no vacío, máximo 100 caracteres
    check('nombre')
        .exists().notEmpty().withMessage('El nombre del hábitat es obligatorio')
        .isLength({ max: 100 }),
    
    // CLIMA: Opcional, máximo 50 caracteres
    check('clima')
        .optional()
        .isLength({ max: 50 }),
    
    // Último paso: valida y retorna errores si los hay
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateHabitat };