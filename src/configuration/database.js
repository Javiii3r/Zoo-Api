const knex = require('knex');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const configPath = path.join(__dirname, '../../config.prod.yaml');

try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContents);

    if (!config || !config.db) {
        throw new Error("No se pudo leer la sección 'db' del archivo YAML");
    }

    const db = knex(config.db);
    module.exports = db;
    console.log("✅ Conexión a la base de datos configurada correctamente.");
} catch (e) {
    console.error("❌ Error cargando la configuración:", e.message);
    process.exit(1);
}