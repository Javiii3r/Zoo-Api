/**\n * SERVICIO DE ANIMALES\n * ====================\n * Capa de acceso a datos (Data Access Layer) para tabla animales\n * Contiene todas las queries Knex para operaciones CRUD\n * Realiza JOINs con tabla habitats para obtener datos relacionados\n */

// Obtiene todos los animales con datos del habitat
// Soporta filtro de busqueda por nombre (LIKE)

const { db } = require('../configuration/database');

const findAllAnimales = async (filtros = {}) => {
    const { nombre } = filtros;

    let query = db('animales')
        .join('habitats', 'animales.habitat_id', 'habitats.id')
        .select(
            'animales.*',
            'habitats.nombre as habitat_nombre',
            'habitats.clima as habitat_clima'
        );

    if (nombre) {
        query = query.where('animales.nombre', 'like', `%${nombre}%`);
    }

    return await query;
};

// Obtiene un animal especifico por ID con informacion del habitat
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
        .first(); // Retorna el primer resultado o undefined
};

// Valida si existe un animal con un ID especifico
const animalExistsById = async (id) => {
    const animal = await db('animales').where({ id }).first();
    return animal !== undefined;
};

// Valida si existe otro animal con el mismo nombre (evita duplicados)
const animalExistsByName = async (nombre) => {
    const animal = await db('animales').where({ nombre }).first();
    return animal !== undefined;
};

// Inserta un nuevo animal en la BD y retorna el registro creado
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
    // Retorna el animal completo con datos del habitat
    return await findAnimal(id);
};

// Actualiza datos de un animal existente
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

// Elimina un animal de la BD
const removeAnimal = async (id) => {
    await db('animales').where({ id }).del();
};

// Obtiene todos los animales que pertenecen a un habitat especifico
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