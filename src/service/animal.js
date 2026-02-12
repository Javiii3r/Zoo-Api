const db = require('../configuration/database');

const findAllAnimals = async () => {
    return await db('animales').select('*');
};

const findAnimal = async (id) => {
    return await db('animales').where({ id }).first();
};

const animalExistsById = async (id) => {
    const animal = await db('animales').where({ id }).first();
    return !!animal;
};

const animalExistsByName = async (nombre) => {
    const animal = await db('animales').where({ nombre }).first();
    return !!animal;
};


const addAnimal = async (nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id) => {
    const [id] = await db('animales').insert({
        nombre,
        especie,
        categoria,
        edad,
        estado_salud,
        descripcion,
        habitat_id
    });
    return { id, nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id };
};

const modifyAnimal = async (id, nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id) => {
    return await db('animales').where({ id }).update({
        nombre,
        especie,
        categoria,
        edad,
        estado_salud,
        descripcion,
        habitat_id
    });
};

const removeAnimal = async (id) => {
    return await db('animales').where({ id }).del();
};

module.exports = {
    findAllAnimals,
    findAnimal,
    animalExistsById,
    animalExistsByName,
    addAnimal,
    modifyAnimal,
    removeAnimal
};