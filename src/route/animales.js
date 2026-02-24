/**
 * RUTAS DE ANIMALES
 * =================
 * Define todos los endpoints para el recurso /animales
 * Monta validadores antes de POST y PUT
 */

const express = require('express');
const { 
    getAnimales,         // Obtiene listado de animales
    getAnimal,           // Obtiene un animal por ID
    postAnimal,          // Crea nuevo animal
    putAnimal,           // Actualiza un animal
    deleteAnimal,        // Elimina un animal
    getAnimalesByHabitat // Obtiene animales de un hábitat
} = require('../controller/animales');

const { validateAnimal } = require('../validators/animales');

const router = express.Router();

// GET /animales - Listar todos (con búsqueda por nombre opcional)
router.get('/', getAnimales);

// GET /animales/habitat/:id - Listar animales de un hábitat
router.get('/habitat/:id', getAnimalesByHabitat);

// GET /animales/:id - Obtener un animal específico
router.get('/:id', getAnimal);

// POST /animales - Crear nuevo animal (validado)
router.post('/', validateAnimal, postAnimal);

// PUT /animales/:id - Actualizar animal (validado)
router.put('/:id', validateAnimal, putAnimal);

// DELETE /animales/:id - Eliminar animal
router.delete('/:id', deleteAnimal);

module.exports = router;