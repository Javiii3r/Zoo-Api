const { findAllAnimals, animalExistsById, animalExistsByName, modifyAnimal, addAnimal, removeAnimal, findAnimal } = require('../service/animal');

const getAnimals = async (req, res) => {
    try {
        const animals = await findAllAnimals();
        res.status(200).json(animals);
    } catch (error) {
        console.error("ERROR REAL EN EL CONTROLADOR:", error);
        res.status(500).send('Internal Server Error');
    }
};

const getAnimal = (async (req, res) => {
    try {
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
    } catch (error) {
        console.error("ERROR EN GET ANIMAL:", error);
        res.status(500).send('Internal Server Error');
    }
});

const postAnimal = (async (req, res) => {
    try {
        const nombre = req.body.nombre;

        if (await animalExistsByName(nombre)) {
            return res.status(409).json({
                code: 409,
                title: 'conflict',
                message: 'ya existe un animal con ese nombre'
            });
        }
        
        const { especie, categoria, edad, estado_salud, descripcion, habitat_id } = req.body;

        const newAnimal = await addAnimal(nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id);
        res.status(201).json(newAnimal);
    } catch (error) {
        console.error("ERROR EN POST ANIMAL:", error);
        res.status(500).send('Internal Server Error');
    }
});

const putAnimal = (async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!await animalExistsById(id)) {
            return res.status(404).json({
                code: 404,
                title: 'not-found',
                message: 'el animal no existe'
            });
        }

        const { nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id } = req.body;

        await modifyAnimal(id, nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id);

        res.status(204).end();
    } catch (error) {
        console.error("ERROR EN PUT ANIMAL:", error);
        res.status(500).send('Internal Server Error');
    }
});

const deleteAnimal = (async (req, res) => {
    try {
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
    } catch (error) {
        console.error("ERROR EN DELETE ANIMAL:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = {
    getAnimals,
    getAnimal,
    postAnimal,
    putAnimal,
    deleteAnimal
};