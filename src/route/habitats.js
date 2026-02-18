const express = require('express');
const { getHabitats, getHabitat, postHabitat, putHabitat, deleteHabitat, getHabitatWithAnimales } = require('../controller/habitats');

const router = express.Router();

router.get('/', getHabitats);
router.get('/:id/animales', getHabitatWithAnimales);
router.get('/:id', getHabitat);
router.post('/', postHabitat);
router.put('/:id', putHabitat);
router.delete('/:id', deleteHabitat);

module.exports = router;