# 🦁 Zoo API - API REST para Gestión de Zoológico

API REST completa para la gestión de animales y hábitats de un zoológico, construida con Node.js, Express y MariaDB.

## 📋 Características

### Animales (CRUD Completo)
- `GET /animales` - Obtener todos los animales
- `GET /animales/:id` - Obtener un animal específico
- `POST /animales` - Crear un nuevo animal
- `PUT /animales/:id` - Actualizar un animal
- `DELETE /animales/:id` - Eliminar un animal

### Hábitats (CRUD Completo)
- `GET /habitats` - Obtener todos los hábitats
- `GET /habitats/:id` - Obtener un hábitat específico
- `POST /habitats` - Crear un nuevo hábitat
- `PUT /habitats/:id` - Actualizar un hábitat
- `DELETE /habitats/:id` - Eliminar un hábitat

### Base de Datos
- **MariaDB 11.3.2** corriendo en Docker
- Dos tablas con relación 1:N (un hábitat puede tener muchos animales)
- **Tabla `habitats`**: id, nombre, descripcion, clima, imagen_url
- **Tabla `animales`**: id, nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id

### Validaciones
- ❌ Error 404 si el recurso no existe
- ❌ Error 409 si se intenta crear un recurso duplicado
- ❌ Error 400 si los datos son inválidos

---

## 🚀 Instalación y Puesta en Marcha

### Requisitos Previos
- **Node.js** (v14 o superior)
- **Docker Desktop** instalado y corriendo
- **Postman** (opcional, para pruebas)

### Paso 1: Instalar Dependencias

```bash
npm install
```

### Paso 2: Configurar Variables de Entorno

Los archivos de configuración ya están creados:

**`.env`** (para Docker):
```env
MARIADB_USER=zoo_user
MARIADB_PASSWORD=zoo_password_2026
MARIADB_DATABASE=zoo_db
MARIADB_ROOT_PASSWORD=root_password_2026
```

**`config.local.yaml`** (para Node.js):
```yaml
db:
  host: localhost
  port: 3306
  user: zoo_user
  password: zoo_password_2026
  database: zoo_db

service:
  port: 8080
```

### Paso 3: Iniciar la Base de Datos (Docker)

```bash
docker-compose -f docker-compose.dev.yaml up -d
```

Este comando:
- ✅ Descarga la imagen de MariaDB 11.3.2
- ✅ Crea un contenedor llamado `zoo-dev-db`
- ✅ Crea la base de datos `zoo_db`
- ✅ Ejecuta el script `db/init.sql` que crea las tablas e inserta datos de ejemplo
- ✅ Expone el puerto 3306

**Verificar que el contenedor está corriendo:**
```bash
docker ps
```

Deberías ver `zoo-dev-db` en la lista.

### Paso 4: Iniciar el Servidor de la API

```bash
npm start
```

Deberías ver el mensaje:
```
Iniciando el backend en el puerto 8080
```

**¡La API está lista!** 🎉

---

## 🧪 Probar la API

### Opción 1: Usando Postman (Recomendado)

1. Abre Postman
2. Importa la colección: **`zoo.postman_collection.json`**
3. Ejecuta las peticiones en orden:
   - Primero las de **Hábitats** (para ver los datos iniciales)
   - Luego las de **Animales**

La colección incluye **24 peticiones de prueba** con casos de éxito y error.

### Opción 2: Usando el Navegador

Abre tu navegador y visita:
- http://localhost:8080/habitats - Ver todos los hábitats
- http://localhost:8080/animales - Ver todos los animales
- http://localhost:8080/animales/1 - Ver el animal con ID 1

### Opción 3: Usando cURL en la Terminal

**Obtener todos los animales:**
```bash
curl http://localhost:8080/animales
```

**Obtener un animal específico:**
```bash
curl http://localhost:8080/animales/1
```

**Crear un nuevo animal:**
```bash
curl -X POST http://localhost:8080/animales -H "Content-Type: application/json" -d "{\"nombre\":\"Nala\",\"especie\":\"Leona africana\",\"categoria\":\"Mamífero\",\"edad\":4,\"estado_salud\":\"Saludable\",\"descripcion\":\"Leona joven\",\"imagen_url\":\"https://example.com/leona.jpg\",\"habitat_id\":1}"
```

**Crear un nuevo hábitat:**
```bash
curl -X POST http://localhost:8080/habitats -H "Content-Type: application/json" -d "{\"nombre\":\"Desierto\",\"descripcion\":\"Hábitat desértico\",\"clima\":\"Árido\",\"imagen_url\":\"https://example.com/desierto.jpg\"}"
```

---

## 📊 Ejemplos de Respuestas

### GET /animales
```json
[
  {
    "id": 1,
    "nombre": "Simba",
    "especie": "León africano",
    "categoria": "Mamífero",
    "edad": 5,
    "estado_salud": "Saludable",
    "descripcion": "León macho de melena dorada",
    "imagen_url": "https://example.com/leon.jpg",
    "habitat_id": 1,
    "habitat_nombre": "Sabana Africana",
    "habitat_clima": "Tropical seco"
  },
  ...
]
```

### GET /habitats/1
```json
{
  "id": 1,
  "nombre": "Sabana Africana",
  "descripcion": "Amplio espacio que recrea el ecosistema de la sabana africana",
  "clima": "Tropical seco",
  "imagen_url": "https://example.com/sabana.jpg"
}
```

---

## 🛠️ Comandos Útiles

### Docker

**Ver contenedores corriendo:**
```bash
docker ps
```

**Ver logs de la base de datos:**
```bash
docker logs zoo-dev-db
```

**Detener la base de datos:**
```bash
docker-compose -f docker-compose.dev.yaml down
```

**Reiniciar la base de datos (borra todos los datos):**
```bash
docker-compose -f docker-compose.dev.yaml down -v
docker-compose -f docker-compose.dev.yaml up -d
```

### Conectarse a MariaDB directamente

```bash
docker exec -it zoo-dev-db mysql -u zoo_user -p
# Password: zoo_password_2026
```

Luego puedes ejecutar comandos SQL:
```sql
USE zoo_db;
SHOW TABLES;
SELECT * FROM animales;
SELECT * FROM habitats;
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que Docker Desktop esté corriendo
- Verifica que el contenedor esté activo: `docker ps`
- Reinicia el contenedor: `docker-compose -f docker-compose.dev.yaml restart`

### Error: "Port 3306 already in use"
- Tienes otro servicio MySQL/MariaDB corriendo
- Detén el otro servicio o cambia el puerto en `docker-compose.dev.yaml`

### Error: "Port 8080 already in use"
- Tienes otra aplicación usando el puerto 8080
- Cambia el puerto en `config.local.yaml` y `src/app.js`

### La base de datos está vacía
- Borra y recrea el contenedor:
```bash
docker-compose -f docker-compose.dev.yaml down -v
docker-compose -f docker-compose.dev.yaml up -d
```

---

## 📁 Estructura del Proyecto

```
zoo-api/
├── db/
│   └── init.sql              # Script de inicialización de la base de datos
├── src/
│   ├── configuration/
│   │   ├── configuration.js  # Carga la configuración YAML
│   │   └── database.js       # Conexión con Knex
│   ├── controller/
│   │   ├── animales.js       # Controlador de animales
│   │   └── habitats.js       # Controlador de hábitats
│   ├── route/
│   │   ├── animales.js       # Rutas de animales
│   │   └── habitats.js       # Rutas de hábitats
│   ├── service/
│   │   └── animales.js       # Lógica de negocio
│   └── app.js                # Punto de entrada de la aplicación
├── .env                      # Variables de entorno para Docker
├── config.local.yaml         # Configuración local
├── config.sample.yaml        # Ejemplo de configuración
├── docker-compose.dev.yaml   # Docker Compose para desarrollo
├── package.json              # Dependencias del proyecto
├── zoo.postman_collection.json  # Colección de Postman
└── README.md                 # Este archivo
```

---

## 👨‍💻 Desarrollo

### Para modificar los datos iniciales
Edita `db/init.sql` y recrea el contenedor:
```bash
docker-compose -f docker-compose.dev.yaml down -v
docker-compose -f docker-compose.dev.yaml up -d
```

### Para agregar más endpoints
1. Agrega funciones en `src/service/animales.js`
2. Agrega controladores en `src/controller/`
3. Agrega rutas en `src/route/`
4. Registra las rutas en `src/app.js`

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta construyendo tu aplicación web del zoológico!** 🦒🐧🦁