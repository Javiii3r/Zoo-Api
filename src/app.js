const express = require('express');
const app = express();
const animalRoutes = require('./route/animal');
const habitatRoutes = require('./route/habitat');
const PORT = 3000;

app.use(express.json()); 

app.use('/api/animals', animalRoutes);
app.use('/api/habitats', habitatRoutes);

app.listen(PORT, () => {
    console.log(`🦁 Zoo API corriendo en http://localhost:${PORT}`);
});

//El archivo app.js es el "interruptor" de la Api.
// Su función principal es agrupar todas las piezas que hemos fabricado y mantener el servidor activo hasta que alguien le pida algo.