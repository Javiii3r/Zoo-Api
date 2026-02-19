const { 
    findAllHabitats, 
    findHabitat, 
    habitatExistsById, 
    habitatExistsByName,
    addHabitat,
    modifyHabitat,
    removeHabitat,
    findHabitatWithAnimales,
    countAnimalesInHabitat 
} = require('../service/habitats');

const getHabitats = async (req, res) => {
    const { nombre } = req.query;
    const habitats = await findAllHabitats({ nombre });
    res.status(200).json(habitats);
};

const getHabitat = async (req, res) => {
    const { id } = req.params;

    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const habitat = await findHabitat(id);
    res.status(200).json(habitat);
};

const postHabitat = async (req, res) => {
    const { nombre, descripcion, clima, imagen_url } = req.body;

    if (await habitatExistsByName(nombre)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'ya existe un habitat con ese nombre'
        });
    }

    const newHabitat = await addHabitat(nombre, descripcion, clima, imagen_url);
    res.status(201).json(newHabitat);
};

const putHabitat = async (req, res) => {
    const { id } = req.params;
    
    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const { nombre, descripcion, clima, imagen_url } = req.body;
    await modifyHabitat(id, nombre, descripcion, clima, imagen_url);
    res.status(204).end();
};

const deleteHabitat = async (req, res) => {
    const { id } = req.params;
    
    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }

    const numAnimales = await countAnimalesInHabitat(id);
    if (numAnimales > 0) {
        return res.status(400).json({
            code: 400,
            title: 'bad-request',
            message: `No se puede eliminar el hábitat porque todavía tiene ${numAnimales} animales asociados.`
        });
    }

    await removeHabitat(id);
    res.status(204).end();
};

const getHabitatWithAnimales = async (req, res) => {
    const { id } = req.params;
    
    if (!await habitatExistsById(id)) {
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'el habitat no existe'
        });
    }
    
    const habitat = await findHabitatWithAnimales(id);
    res.status(200).json(habitat);
};

module.exports = {
    getHabitats,
    getHabitat,
    postHabitat,
    putHabitat,
    deleteHabitat,
    getHabitatWithAnimales
};