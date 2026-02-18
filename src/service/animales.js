const { db } = require('../configuration/database');

const findAllAnimales = async () => {
    return await db('animales')
        .join('habitats', 'animales.habitat_id', 'habitats.id')
        .select(
            'animales.*',
            'habitats.nombre as habitat_nombre',
            'habitats.clima as habitat_clima'
        );
};

const findAnimal = async (id) => {
    return await db('animales')
        .join('habitats', 'animales.habitat_id', 'habitats.id')
        .select(
            'animales.*',
            'habitats.nombre as habitat_nombre',
            'habitats.descripcion as habitat_descripcion',
            'habitats.clima as habitat_clima'
        )
        .where('animales.id', id)
        .first();
};

const animalExistsById = async (id) => {
    const animal = await db('animales').where({ id }).first();
    return animal !== undefined;
};

const animalExistsByName = async (nombre) => {
    const animal = await db('animales').where({ nombre }).first();
    return animal !== undefined;
};

const addAnimal = async (nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id) => {
    const [id] = await db('animales').insert({
        nombre,
        especie,
        categoria,
        edad,
        estado_salud,
        descripcion,
        imagen_url,
        habitat_id
    });
    return await findAnimal(id);
};

const modifyAnimal = async (id, nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id) => {
    await db('animales').where({ id }).update({
        nombre,
        especie,
        categoria,
        edad,
        estado_salud,
        descripcion,
        imagen_url,
        habitat_id
    });
};

const removeAnimal = async (id) => {
    await db('animales').where({ id }).del();
};

const findAnimalesByHabitat = async (habitat_id) => {
    return await db('animales')
        .join('habitats', 'animales.habitat_id', 'habitats.id')
        .select(
            'animales.*',
            'habitats.nombre as habitat_nombre',
            'habitats.clima as habitat_clima'
        )
        .where('animales.habitat_id', habitat_id);
};

module.exports = {
    findAllAnimales,
    findAnimal,
    animalExistsById,
    animalExistsByName,
    addAnimal,
    modifyAnimal,
    removeAnimal,
    findAnimalesByHabitat
};