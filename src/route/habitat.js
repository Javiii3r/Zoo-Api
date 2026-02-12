const express = require('express');
const router = express.Router();
const habitatController = require('../controller/habitat');

router.get('/', habitatController.getHabitats);
router.post('/', habitatController.postHabitat);
router.delete('/:id', habitatController.deleteHabitat); 

module.exports = router;