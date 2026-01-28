const express = require('express');
const app = express();
app.use(express.json());


const animalsRouter = require('./route/animal'); 
app.use('/', animalsRouter); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Iniciando el backend en el puerto ${PORT}`);
});
