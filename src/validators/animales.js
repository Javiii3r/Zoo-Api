const { check } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult');

const validateAnimal = [
    check('nombre')
        .exists().notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 100 }),
    check('especie')
        .exists().notEmpty().withMessage('La especie es obligatoria'),
    check('categoria')
        .exists()
        .isIn(['Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez'])
        .withMessage('Categoría no válida'),
    check('estado_salud')
        .optional()
        .isIn(['Saludable', 'Requiere atención'])
        .withMessage('Estado de salud no válido'),
    check('habitat_id')
        .optional()
        .isNumeric().withMessage('habitat_id debe ser un número'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateAnimal };