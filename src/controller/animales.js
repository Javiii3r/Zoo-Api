const { 
    findAllAnimales, 
    animalExistsById, 
    animalExistsByName, 
    modifyAnimal, 
    addAnimal, 
    removeAnimal, 
    findAnimal,
    findAnimalesByHabitat
} = require('../service/animales');

const { habitatExistsById } = require('../service/habitats');

const getAnimales = async (req, res) => {
    const animales = await findAllAnimales();
    res.status(200).json(animales);
};

const getAnimal = async (req, res) => {
    const id = req.params.id;

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

    const categorias_validas = ['Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez'];
    if (categoria && !categorias_validas.includes(categoria)) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: 'categoría no válida'
        });
    }

    const estados_validos = ['Saludable', 'Requiere atención'];
    if (estado_salud && !estados_validos.includes(estado_salud)) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: 'estado de salud no válido'
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
    const id = req.params.id;
    
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
    const id = req.params.id;
    
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
    const habitat_id = req.params.id;
    
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