const habitatService = require('../service/habitat');

const getHabitats = async (req, res) => {
    try {
        const habitats = await habitatService.findAllHabitats();
        res.status(200).json(habitats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postHabitat = async (req, res) => {
    try {
        const { nombre, descripcion, clima, imagen_url } = req.body;
        if (await habitatService.habitatExistsByName(nombre)) {
            return res.status(409).json({ message: 'El hábitat ya existe' });
        }
        const newHabitat = await habitatService.addHabitat(nombre, descripcion, clima, imagen_url);
        res.status(201).json(newHabitat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteHabitat = async (req, res) => {
    try {
        const { id } = req.params;
        await habitatService.removeHabitat(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getHabitats,
    postHabitat,
    deleteHabitat
};