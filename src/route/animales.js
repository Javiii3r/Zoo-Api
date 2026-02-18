const express = require('express');
const { getAnimales, getAnimal, postAnimal, putAnimal, deleteAnimal, getAnimalesByHabitat } = require('../controller/animales');

const router = express.Router();

router.get('/', getAnimales);
router.get('/habitat/:id', getAnimalesByHabitat);
router.get('/:id', getAnimal);
router.post('/', postAnimal);
router.put('/:id', putAnimal);
router.delete('/:id', deleteAnimal);

module.exports = router;