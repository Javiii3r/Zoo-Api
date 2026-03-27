/**
 * CONTROLADOR DE HABITATS
 * =======================
 * Maneja las peticiones HTTP para el recurso /habitats
 * Valida datos, comprueba integridad referencial y usa service para BD
 */

const { 
    findAllHabitats,          // Obtiene todos los habitats
    findHabitat,              // Obtiene un habitat por ID
    habitatExistsById,        // Valida si un habitat existe
    habitatExistsByName,      // Valida si existe otro habitat con mismo nombre
    addHabitat,               // Crea nuevo habitat
    modifyHabitat,            // Actualiza habitat
    removeHabitat,            // Elimina habitat de BD
    findHabitatWithAnimales,  // Obtiene habitat con sus animales
    countAnimalesInHabitat    // Cuenta cuantos animales hay en un habitat
} = require('../service/habitats');

// GET /habitats
// Obtiene listado de todos los habitats (con busqueda por nombre opcional)
const getHabitats = async (req, res) => {
    const { nombre } = req.query;
    const habitats = await findAllHabitats({ nombre });
    res.status(200).json(habitats);
};

// GET /habitats/:id
// Obtiene un habitat especifico por su ID
const getHabitat = async (req, res) => {
    const { id } = req.params;

    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const habitat = await findHabitat(id);
    res.status(200).json(habitat);
};

// POST /habitats
// Crea un nuevo habitat
// Valida que el nombre sea unico (409 si ya existe)
const postHabitat = async (req, res) => {
    const { nombre, descripcion, clima, imagen_url } = req.body;

    if (await habitatExistsByName(nombre)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'ya existe un habitat con ese nombre'
        });
    }

    const newHabitat = await addHabitat(nombre, descripcion, clima, imagen_url);
    // Retorna 201 Created
    res.status(201).json(newHabitat);
};

// PUT /habitats/:id
// Actualiza datos de un habitat existente
const putHabitat = async (req, res) => {
    const { id } = req.params;
    
    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const { nombre, descripcion, clima, imagen_url } = req.body;
    await modifyHabitat(id, nombre, descripcion, clima, imagen_url);
    // Retorna 204 No Content
    res.status(204).end();
};

// DELETE /habitats/:id
// Elimina un habitat (Solo si no tiene animales asociados)
// Retorna 400 si hay animales en el habitat
const deleteHabitat = async (req, res) => {
    const { id } = req.params;
    
    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const numAnimales = await countAnimalesInHabitat(id);
    // Valida integridad referencial: no permite ciellos habitats con animales
    if (numAnimales > 0) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: `No se puede eliminar el hábitat porque todavía tiene ${numAnimales} animales asociados.`
        });
    }

    await removeHabitat(id);
    res.status(204).end();
};

    // GET /habitats/:id/animales
// Obtiene un habitat con su lista de animales residentes
const getHabitatWithAnimales = async (req, res) => {
    const { id } = req.params;
    
    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }
    
    const habitat = await findHabitatWithAnimales(id);
    res.status(200).json(habitat);
};

module.exports = {
    getHabitats,
    getHabitat,
    postHabitat,
    putHabitat,
    deleteHabitat,
    getHabitatWithAnimales
};