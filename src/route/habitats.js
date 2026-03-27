/**
 * RUTAS DE HABITATS
 * =================
 * Define todos los endpoints para el recurso /habitats
 * Monta validadores antes de POST y PUT
 */

const express = require('express');
const { 
    getHabitats,          // Obtiene listado de hábitats
    getHabitat,           // Obtiene un hábitat por ID
    postHabitat,          // Crea nuevo hábitat
    putHabitat,           // Actualiza un hábitat
    deleteHabitat,        // Elimina un hábitat (solo sin animales)
    getHabitatWithAnimales // Obtiene hábitat con sus animales
} = require('../controller/habitats');

const { validateHabitat } = require('../validators/habitats');

const router = express.Router();

// GET /habitats - Listar todos (con búsqueda por nombre opcional)
router.get('/', getHabitats);

// GET /habitats/:id/animales - Obtener hábitat con sus animales
router.get('/:id/animales', getHabitatWithAnimales);

// GET /habitats/:id - Obtener un hábitat específico
router.get('/:id', getHabitat);

// POST /habitats - Crear nuevo hábitat (validado)
router.post('/', validateHabitat, postHabitat);

// PUT /habitats/:id - Actualizar hábitat (validado)
router.put('/:id', validateHabitat, putHabitat);

// DELETE /habitats/:id - Eliminar hábitat (solo si no tiene animales)
router.delete('/:id', deleteHabitat);

module.exports = router;