/**
 * VALIDADORES DE ANIMALES
 * =======================
 * Usa express-validator para validar datos en POST y PUT /animales
 * Se monta como middleware en las rutas correspondientes
 */

const { check } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult');

/**
 * Constructor de validaciones para animales
 * Valida: nombre, especie, categoria, estado_salud, habitat_id
 */
const validateAnimal = [
    // NOMBRE: Obligatorio, no vacío, máximo 100 caracteres
    check('nombre')
        .exists().notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100 }),
    
    // ESPECIE: Obligatoria
    check('especie')
        .exists().notEmpty().withMessage('La especie es obligatoria'),
    
    // CATEGORIA: Debe estar en el enum de categorías válidas
    check('categoria')
        .exists()
        .isIn(['Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez'])
        .withMessage('Categoría no válida'),
    
    // ESTADO_SALUD: Opcional, si se proporciona debe estar en el enum
    check('estado_salud')
        .optional()
        .isIn(['Saludable', 'Requiere atención'])
        .withMessage('Estado de salud no válido'),
    
    // HABITAT_ID: Opcional, pero si se proporciona debe ser numérico
    check('habitat_id')
        .optional()
        .isNumeric().withMessage('habitat_id debe ser un número'),
    
    // Último paso: valida y retorna errores si los hay
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateAnimal };