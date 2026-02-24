/**
 * MÓDULO DE CONFIGURACIÓN
 * =======================
 * Gestiona la carga de ficheros YAML de configuración
 * Permite especificar el fichero mediante argumento CLI: --config config.local.yaml
 */

const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
 
// Por defecto carga configuración de producción
let configFile = 'config.prod.yaml';

// Parsea argumentos CLI
const argv = yargs(hideBin(process.argv)).argv;

// Si se proporciona --config en línea de comandos, lo usa
if (argv.config != undefined) {
    configFile = argv.config;
}

// Carga y parsea el fichero YAML
const config = yaml.load(fs.readFileSync(configFile, 'utf-8'));
 
// Exporta objeto config global
module.exports = {
    config
};