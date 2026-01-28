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
            messcolour: 'the animal does not exist'
        });
    }

    const animal = await findAnimal(id);

    res.status(200).json(animal);
});

const postAnimal = (async (req, res) => {
    const name = req.body.name;

    if (await animalExistsByName(name)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            messcolour: 'a animal already exists with that name'
        });
    }
    
    const species = req.body.species;
    const habitat = req.body.habitat;
    const colour = req.body.colour;
    
    const newAnimal = await addAnimal(name, species, habitat, colour);
    res.status(201).json(newAnimal);
});

const putAnimal = (async (req, res) => {
    const id = req.params.id;
    
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            messcolour: 'the animal does not exist'
        });
    }

    const name = req.body.name;
    const species = req.body.species;
    const habitat = req.body.habitat;
    const colour = req.body.colour;

    await modifyAnimal(id, name, species, habitat, colour);

    res.status(204).end();
});

const deleteAnimal = (async (req, res) => {
    const id = req.params.id;
    
    if (!await animalExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            messcolour: 'the animal does not exist'
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