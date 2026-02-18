const { db } = require('../configuration/database');

const findAllHabitats = async () => {
    return await db('habitats').select('*');
};

const findHabitat = async (id) => {
    return await db('habitats').where({ id }).first();
};

const habitatExistsById = async (id) => {
    const habitat = await db('habitats').where({ id }).first();
    return habitat !== undefined;
};

const habitatExistsByName = async (nombre) => {
    const habitat = await db('habitats').where({ nombre }).first();
    return habitat !== undefined;
};

const addHabitat = async (nombre, descripcion, clima, imagen_url) => {
    const [id] = await db('habitats').insert({
        nombre,
        descripcion,
        clima,
        imagen_url
    });
    return await findHabitat(id);
};

const modifyHabitat = async (id, nombre, descripcion, clima, imagen_url) => {
    await db('habitats').where({ id }).update({
        nombre,
        descripcion,
        clima,
        imagen_url
    });
};

const removeHabitat = async (id) => {
    await db('habitats').where({ id }).del();
};

const findHabitatWithAnimales = async (id) => {
    const habitat = await db('habitats').where({ id }).first();
    
    if (!habitat) {
        return null;
    }
    
    const animales = await db('animales')
        .where('habitat_id', id)
        .select('*');
    
    return {
        ...habitat,
        animales
    };
};

module.exports = {
    findAllHabitats,
    findHabitat,
    habitatExistsById,
    habitatExistsByName,
    addHabitat,
    modifyHabitat,
    removeHabitat,
    findHabitatWithAnimales
};
