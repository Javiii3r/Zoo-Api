
const { findAllAnimals, animalExistsById, animalExistsByName, modifyAnimal, addAnimal, removeAnimal, findAnimal } = require('../service/animal');

const getAnimals = (async (req, res) => {
    const animals = await findAllAnimals();
    res.status(200).json(animals);
});

const getAnimal = (async (req, res) => {
    const id = req.params.id;

    if (! await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }

    const animal = await findAnimal(id);
    res.status(200).json(animal);
});

const postAnimal = (async (req, res) => {
    const nombre = req.body.nombre;

    if (await animalExistsByName(nombre)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'ya existe un animal con ese nombre'
        });
    }
    
    const especie = req.body.especie;
    const categoria = req.body.categoria;
    const edad = req.body.edad;
    const estado_salud = req.body.estado_salud;
    const descripcion = req.body.descripcion;
    const habitat_id = req.body.habitat_id;

    const newAnimal = await addAnimal(nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id);
    res.status(201).json(newAnimal);
});

const putAnimal = (async (req, res) => {
    const id = req.params.id;
    
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el animal no existe'
        });
    }

    const nombre = req.body.nombre;
    const especie = req.body.especie;
    const categoria = req.body.categoria;
    const edad = req.body.edad;
    const estado_salud = req.body.estado_salud;
    const descripcion = req.body.descripcion;
    const habitat_id = req.body.habitat_id;

    await modifyAnimal(id, nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id);

    res.status(204).end();
});

const deleteAnimal = (async (req, res) => {
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
});

module.exports = {
    getAnimals,
    getAnimal,
    postAnimal,
    putAnimal,
    deleteAnimal
}