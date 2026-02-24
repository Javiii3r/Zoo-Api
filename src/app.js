/**
 * PUNTO DE ENTRADA DE LA APLICACIÓN ZOO API
 * ==========================================
 * Archivo principal que configura Express, monta las rutas y middlewares
 * Escucha en puerto 8080
 */

const express = require('express');
const animalesRoute = require('./route/animales');
const habitatsRoute = require('./route/habitats');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Monta las rutas de animales en /animales
app.use('/animales', animalesRoute);

// Monta las rutas de hábitats en /habitats
app.use('/habitats', habitatsRoute);

// Middleware global de manejo de errores (debe ir al final)
app.use(errorHandler);

// Inicia el servidor en puerto 8080
app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});