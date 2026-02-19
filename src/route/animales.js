const express = require('express');
const { 
    getAnimales, 
    getAnimal, 
    postAnimal, 
    putAnimal, 
    deleteAnimal, 
    getAnimalesByHabitat 
} = require('../controller/animales');

const { validateAnimal } = require('../validators/animales');

const router = express.Router();

router.get('/', getAnimales);
router.get('/habitat/:id', getAnimalesByHabitat);
router.get('/:id', getAnimal);
router.post('/', validateAnimal, postAnimal);
router.put('/:id', validateAnimal, putAnimal);

router.delete('/:id', deleteAnimal);

module.exports = router;