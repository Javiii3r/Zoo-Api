const db = require('../configuration/database.js').db;

const findAllAnimals = (async () => {
    return await db('animales').select('*');
});

const findAnimal = (async(id) => {
    return await db('animales').select('*').where({id: id}).first();
});

const addAnimal = async (nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id) => {
    return await db('animales').insert({
        nombre: nombre,
        especie: especie,
        categoria: categoria,
        edad: edad,
        estado_salud: estado_salud,
        descripcion: descripcion,
        habitat_id: habitat_id
    });
};

const modifyAnimal = async (id, nombre, especie, categoria, edad, estado_salud, descripcion, habitat_id) => {
    return await db('animales')
        .where({ id: id })
        .update({
            nombre: nombre,
            especie: especie,
            categoria: categoria,
            edad: edad,
            estado_salud: estado_salud,
            descripcion: descripcion,
            habitat_id: habitat_id
        });
};

const removeAnimal = async (id) => {
    return await db('animales').where({ id: id }).del();
};

const animalExistsById = (async(id) => {
    const animal = await db('animales').select('*').where({id: id}).first();
    return animal != null;
});

const animalExistsByName = (async(nombre) => {
    const animal = await db('animales').select('*').where({nombre: nombre}).first();
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