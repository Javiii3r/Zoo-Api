const app = require('express')();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Iniciando en http://localhost:${PORT}`);
});

//El archivo app.js es el "interruptor" de la Api.
// Su función principal es agrupar todas las piezas que hemos fabricado y mantener el servidor activo hasta que alguien le pida algo.