const { check } = require('express-validator');
const { validateResult } = require('../middlewares/validateResult');

const validateHabitat = [
    check('nombre')
        .exists().notEmpty().withMessage('El nombre del hábitat es obligatorio')
        .isLength({ max: 100 }),
    check('clima')
        .optional()
        .isLength({ max: 50 }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateHabitat };