/**\n * CONTROLADOR DE ANIMALES\n * =======================\n * Maneja las peticiones HTTP para el recurso /animales\n * Valida datos, comprueba integridad referencial y usa service para BD\n */\n\nconst { \n    findAllAnimales,      // Obtiene todos los animales (con búsqueda opcional)\n    animalExistsById,     // Valida si un animal existe por ID\n    animalExistsByName,   // Valida si existe un animal por nombre (evita duplicados)\n    modifyAnimal,         // Actualiza datos de animal\n    addAnimal,            // Crea nuevo animal\n    removeAnimal,         // Elimina animal\n    findAnimal,           // Obtiene un animal con datos del hábitat\n    findAnimalesByHabitat // Obtiene animales de un hábitat específico\n} = require('../service/animales');\n\nconst { habitatExistsById } = require('../service/habitats');\n\n/**\n * GET /animales\n * ==============\n * Obtiene listado de todos los animales\n * Soporta búsqueda por nombre mediante query param: ?nombre=león\n */\nconst getAnimales = async (req, res) => {\n    // Extrae parámetro de búsqueda (si existe)\n    const { nombre } = req.query; \n\n    // Obtiene animales de BD (con filtro LIKE si se proporciona nombre)\n    const animales = await findAllAnimales({ nombre }); \n    \n    // Retorna 200 OK con array de animales\n    res.status(200).json(animales);\n};

const getAnimal = async (req, res) => {
    const { id } = req.params;

    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }

    const animal = await findAnimal(id);
    res.status(200).json(animal);
};

const postAnimal = async (req, res) => {
    const { nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id } = req.body;

    if (await animalExistsByName(nombre)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'ya existe un animal con ese nombre'
        });
    }

    if (habitat_id && !await habitatExistsById(habitat_id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const newAnimal = await addAnimal(
        nombre, 
        especie, 
        categoria, 
        edad, 
        estado_salud || 'Saludable', 
        descripcion, 
        imagen_url, 
        habitat_id
    );
    
    res.status(201).json(newAnimal);
};

const putAnimal = async (req, res) => {
    const { id } = req.params;
    
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }

    const { nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id } = req.body;

    if (habitat_id && !await habitatExistsById(habitat_id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    await modifyAnimal(id, nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id);
    res.status(204).end();
};

const deleteAnimal = async (req, res) => {
    const { id } = req.params;
    
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }
    
    await removeAnimal(id);
    res.status(204).end();
};

const getAnimalesByHabitat = async (req, res) => {
    const { id: habitat_id } = req.params;
    
    if (!await habitatExistsById(habitat_id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }
    
    const animales = await findAnimalesByHabitat(habitat_id);
    res.status(200).json(animales);
};

module.exports = {
    getAnimales,
    getAnimal,
    postAnimal,
    putAnimal,
    deleteAnimal,
    getAnimalesByHabitat
};