const express = require('express');
const router = express.Router();

const { getAnimals, getAnimal, postAnimal, putAnimal, deleteAnimal } = require('../controller/animal');

router.get('/animals', getAnimals);
router.get('/animals/:id',getAnimal);
router.post('/animals', postAnimal);
router.put('/animals/:id', putAnimal);
router.delete('/animals/:id', deleteAnimal);

module.exports = router;
