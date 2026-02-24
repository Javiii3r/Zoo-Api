/**
 * MÓDULO DE CONEXIÓN A BASE DE DATOS
 * ===================================
 * Configura y exporta instancia Knex para queries a MySQL/MariaDB
 * Usa credenciales del fichero YAML de configuración
 */

const knex = require('knex');
const { config } = require('./configuration');

// Crea instancia Knex con credenciales de configuración
const db = knex({
    client: 'mysql',              // Driver MySQL/MariaDB
    connection: {
        host: config.db.host,     // Host de la BD
        port: config.db.port,     // Puerto MySQL
        user: config.db.user,      // Usuario
        password: config.db.password, // Contraseña
        database: config.db.database  // Nombre de base de datos
    },
    useNullAsDefault: true         // Permite valores null por defecto
});

// Exporta instancia de Knex para usar en toda la aplicación
exports.db = db;