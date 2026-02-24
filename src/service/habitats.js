/**
 * SERVICIO DE HABITATS
 * ====================
 * Capa de acceso a datos (Data Access Layer) para tabla habitats
 * Contiene todas las queries Knex para operaciones CRUD
 */

const { db } = require('../configuration/database');

// Obtiene todos los habitats
// Soporta filtro de busqueda por nombre (LIKE)
const findAllHabitats = async (filtros = {}) => {
    const { nombre } = filtros;

    let query = db('habitats').select('*');

    if (nombre) {
        query = query.where('nombre', 'like', `%${nombre}%`);
    }

    return await query;
};

// Obtiene un habitat especifico por ID
const findHabitat = async (id) => {
    return await db('habitats').where({ id }).first();
};

// Valida si existe un habitat con un ID especifico
const habitatExistsById = async (id) => {
    const habitat = await db('habitats').where({ id }).first();
    return habitat !== undefined;
};

// Valida si existe otro habitat con el mismo nombre (evita duplicados)
const habitatExistsByName = async (nombre) => {
    const habitat = await db('habitats').where({ nombre }).first();
    return habitat !== undefined;
};

// Inserta un nuevo habitat en la BD y retorna el registro creado
const addHabitat = async (nombre, descripcion, clima, imagen_url) => {
    const [id] = await db('habitats').insert({
        nombre,
        descripcion,
        clima,
        imagen_url
    });
    // Retorna el habitat completo
    return await findHabitat(id);
};

// Actualiza datos de un habitat existente
const modifyHabitat = async (id, nombre, descripcion, clima, imagen_url) => {
    await db('habitats').where({ id }).update({
        nombre,
        descripcion,
        clima,
        imagen_url
    });
};

// Elimina un habitat de la BD
const removeHabitat = async (id) => {
    await db('habitats').where({ id }).del();
};

// Cuenta cuantos animales hay en un habitat especifico
// Se usa para validar si se puede eliminar el habitat
const countAnimalesInHabitat = async (habitat_id) => {
    const result = await db('animales')
        .where({ habitat_id })
        .count('id as total')
        .first();
    return result.total;
};

// Obtiene un habitat con su lista de animales
const findHabitatWithAnimales = async (id) => {
    const habitat = await db('habitats').where({ id }).first();
    if (!habitat) return null;
    
    const animales = await db('animales').where('habitat_id', id).select('*');
    return { ...habitat, animales };
};

module.exports = {
    findAllHabitats,
    findHabitat,
    habitatExistsById,
    habitatExistsByName,
    addHabitat,
    modifyHabitat,
    removeHabitat,
    findHabitatWithAnimales,
    countAnimalesInHabitat
};