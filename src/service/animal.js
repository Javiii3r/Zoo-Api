const db = require('../configuration/database.js').db;

const findAllAnimals = (async () => {
    return await db('animals').select('*');
});

const findAnimal = (async(id) => {
    return await db('animals').select('*').where({id: id}).first();
});

const addAnimal = async (name, species, habitat, colour) => {
    return await db('animals').insert({
        name,
        species,
        habitat,
        colour
    });
};

const modifyAnimal = async (id, name, species, habitat, colour) => {
    return await db('animals')
        .where({ id })
        .update({
            name,
            species,
            habitat,
            colour
        });
};
const removeAnimal = async (id) => {
    return await db('animals') .where({ id }) .del();
};

const animalExistsById = (async(id) => {
    const animal = await db('animals').select('*').where({id: id}).first();
    return animal != null;
});

const animalExistsByName = (async(name) => {
    const animal = await db('animals').select('*').where({name: name}).first();
    if (animal === undefined) {
        return false;
    } else {
        return true;
    }
});


module.exports = {
    findAllAnimals,
    findAnimal,
    addAnimal,
    modifyAnimal,
    removeAnimal,
    animalExistsById,
    animalExistsByName
}