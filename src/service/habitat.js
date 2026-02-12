const db = require('../configuration/database');

const findAllHabitats = async () => {
    return await db('habitats').select('*');
};

const findHabitatById = async (id) => {
    return await db('habitats').where({ id }).first();
};

const habitatExistsByName = async (nombre) => {
    const habitat = await db('habitats').where({ nombre }).first();
    return !!habitat;
};

const addHabitat = async (nombre, descripcion, clima, imagen_url) => {
    const [id] = await db('habitats').insert({ nombre, descripcion, clima, imagen_url });
    return { id, nombre, descripcion, clima, imagen_url };
};

const modifyHabitat = async (id, habitatData) => {
    return await db('habitats').where({ id }).update(habitatData);
};

const removeHabitat = async (id) => {
    return await db('habitats').where({ id }).del();
};

module.exports = {
    findAllHabitats,
    findHabitatById,
    habitatExistsByName,
    addHabitat,
    modifyHabitat,
    removeHabitat
};