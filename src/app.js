const express = require('express');
const animalesRoute = require('./route/animales');
const habitatsRoute = require('./route/habitats');


const app = express();
app.use(express.json());

app.use('/animales', animalesRoute);
app.use('/habitats', habitatsRoute);


app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
