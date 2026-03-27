<div align="center">
   <h1>🦁 Zoo API</h1>

   ### API REST profesional para la gestión de animales y hábitats de un zoológico

   [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933.svg?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
   [![Express](https://img.shields.io/badge/Express-5.x-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
   [![MariaDB](https://img.shields.io/badge/MariaDB-003545.svg?logo=mariadb&logoColor=white)](https://mariadb.com/)
   [![Knex.js](https://img.shields.io/badge/Knex.js-Query%20Builder-e16426.svg)](https://knexjs.org/)
   [![Docker](https://img.shields.io/badge/Docker-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com/)
   [![express-validator](https://img.shields.io/badge/express--validator-7.x-blueviolet.svg)](https://express-validator.github.io/)
   [![Postman](https://img.shields.io/badge/Postman-Ready-FF6C37.svg?logo=postman&logoColor=white)](https://www.postman.com/)

   <p align="center">
      <strong>Una API REST robusta de tres capas</strong> para crear, consultar, actualizar y eliminar animales y hábitats de un zoológico, con persistencia en MariaDB (Docker), validación avanzada y una colección Postman lista para usar.
   </p>
</div>

---

## 📋 Descripción

**Zoo API** es una API REST backend desarrollada como proyecto de la **1ª Evaluación** del ciclo **DAW (Desarrollo de Aplicaciones Web)**. Implementa un CRUD completo sobre dos entidades relacionadas — `animales` y `habitats` —, aplicando una **arquitectura de tres capas** (Controller → Service → Database) y buenas prácticas del desarrollo web moderno.

### Módulos principales

- **Routes** — Mapeo HTTP, inyección de validadores por endpoint
- **Controllers** — Lógica de negocio, validación de resultados y respuestas HTTP
- **Services** — Consultas SQL dinámicas con Knex.js (búsqueda LIKE, joins, filtros)
- **Validators** — Reglas declarativas con express-validator
- **Middlewares** — Manejo centralizado de errores y preprocesamiento de validaciones

## ✨ Características

- 🐾 **CRUD Completo** — Crear, leer, actualizar y eliminar animales y hábitats
- 🔗 **Integridad referencial** — Impide eliminar hábitats que contienen animales
- 🔍 **Búsqueda dinámica** — Filtrado por nombre con queries LIKE (`?nombre=leon`)
- ✅ **Validación avanzada** — Campos obligatorios, rangos numéricos y unicidad de nombre
- 🗄️ **Base de datos MariaDB** — Gestionada con Docker y Knex.js como query builder
- 📄 **Respuestas JSON estándar** — Códigos HTTP semánticos en cada situación
- 📬 **Colección Postman incluida** — Suite de tests automáticos lista para importar
- ⚙️ **Configuración YAML** — Separación clara entre entornos con `config.local.yaml`
- 🧩 **Arquitectura escalable** — Patrón por capas: Routes → Controller → Service → DB

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Enlace |
|------------|---------|--------|
| **Node.js** | ≥ 18 LTS | [nodejs.org](https://nodejs.org/) |
| **Express.js** | ^5.1.0 | [expressjs.com](https://expressjs.com/) |
| **Knex.js** | ^3.1.0 | [knexjs.org](https://knexjs.org/) |
| **MariaDB (mysql)** | ^2.18.1 | [mariadb.com](https://mariadb.com/) |
| **express-validator** | ^7.0.0 | [express-validator.github.io](https://express-validator.github.io/) |
| **js-yaml** | 4.1.1 | [npmjs.com](https://www.npmjs.com/package/js-yaml) |
| **Docker Desktop** | Última | [docker.com](https://www.docker.com/) |

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Requisito | Versión | Enlace |
|-----------|---------|--------|
| **Node.js** | ≥ 18 LTS | [Descargar](https://nodejs.org/) |
| **npm** | Incluido con Node.js | — |
| **Docker Desktop** | Última estable | [Descargar](https://www.docker.com/products/docker-desktop/) |
| **Postman** (opcional) | Última estable | [Descargar](https://www.postman.com/downloads/) |

## 🚀 Instalación y Arranque

### 1. Clona el Repositorio

```bash
git clone https://github.com/Javiii3r/ZooApi.git
cd ZooApi
```

### 2. Copia y edita la configuración

```bash
cp config.sample.yaml config.local.yaml
```

Edita `config.local.yaml` con tus credenciales:

```yaml
db:
  host: localhost
  port: 3306
  user: zoo_user
  password: zoo_password_2026
  database: zoo_db
  connectionLimit: 10

service:
  port: 8080
  nodeEnv: development
```

También crea o verifica el archivo `.env` para Docker:

```env
MARIADB_USER=zoo_user
MARIADB_PASSWORD=zoo_password_2026
MARIADB_DATABASE=zoo_db
MARIADB_ROOT_PASSWORD=root_password_2026
```

### 3. Levanta la Base de Datos (Docker)

```bash
docker-compose -f docker-compose.dev.yaml up -d
```

Verifica que el contenedor está corriendo:

```bash
docker ps
# Deberías ver un contenedor con mariadb:latest en el puerto 3306
```

### 4. Instala las Dependencias

```bash
npm install
```

### 5. Inicia el Servidor

```bash
npm start
```

✅ **La API estará disponible en** `http://localhost:8080`

> El script de inicialización SQL (`db/init.sql`) crea automáticamente las tablas `habitats` y `animales` en el primer arranque del contenedor.

---

## 🔌 API — Endpoints

Base URL: `http://localhost:8080`

### 🌿 Hábitats

| Método | Endpoint | Descripción | Código éxito |
|--------|----------|-------------|:------------:|
| `GET` | `/habitats` | Lista todos los hábitats (`?nombre=sabana`) | `200` |
| `GET` | `/habitats/:id` | Obtiene un hábitat por ID | `200` |
| `GET` | `/habitats/:id/animales` | Hábitat con su lista de animales | `200` |
| `POST` | `/habitats` | Crea un nuevo hábitat | `201` |
| `PUT` | `/habitats/:id` | Actualiza un hábitat existente | `200` |
| `DELETE` | `/habitats/:id` | Elimina un hábitat ⚠️ *sin animales* | `204` |

### 🐾 Animales

| Método | Endpoint | Descripción | Código éxito |
|--------|----------|-------------|:------------:|
| `GET` | `/animales` | Lista todos los animales (`?nombre=leon`) | `200` |
| `GET` | `/animales/:id` | Obtiene un animal por ID | `200` |
| `GET` | `/animales/habitat/:habitatId` | Animales de un hábitat concreto | `200` |
| `POST` | `/animales` | Crea un nuevo animal | `201` |
| `PUT` | `/animales/:id` | Actualiza los datos de un animal | `200` |
| `DELETE` | `/animales/:id` | Elimina un animal por ID | `204` |

### Modelos de Datos

**Hábitat**

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|:-----------:|-------------|
| `id` | `integer` | Auto | Identificador único (autoincremental) |
| `nombre` | `string` | ✅ | Nombre del hábitat (único, 1-100 chars) |
| `descripcion` | `string` | ❌ | Descripción del espacio (máx. 500 chars) |
| `clima` | `string` | ✅ | Tipo de clima (ej: Tropical, Ártico) |

**Animal**

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|:-----------:|-------------|
| `id` | `integer` | Auto | Identificador único (autoincremental) |
| `nombre` | `string` | ✅ | Nombre del animal (único, 1-100 chars) |
| `especie` | `string` | ✅ | Especie del animal (1-100 chars) |
| `edad` | `integer` | ✅ | Edad en años (0-150) |
| `peso` | `number` | ✅ | Peso en kg (0.1-1000) |
| `habitatId` | `integer` | ✅ | ID del hábitat al que pertenece (debe existir) |

### Ejemplos de Body (POST / PUT)

**Hábitat:**
```json
{
  "nombre": "Sabana Africana",
  "descripcion": "Extensas llanuras con acacias y pastizales",
  "clima": "Tropical"
}
```

**Animal:**
```json
{
  "nombre": "Simba",
  "especie": "León",
  "edad": 5,
  "peso": 190,
  "habitatId": 1
}
```

### Códigos de Respuesta

| Código | Cuándo ocurre |
|--------|---------------|
| `200 OK` | GET o PUT exitoso |
| `201 Created` | POST exitoso, recurso creado |
| `204 No Content` | DELETE exitoso |
| `400 Bad Request` | Datos inválidos o hábitat con animales asociados |
| `404 Not Found` | El recurso con ese ID no existe |
| `409 Conflict` | Ya existe un registro con ese nombre |
| `500 Server Error` | Error interno del servidor |

---

## 📁 Estructura del Proyecto

```text
ZooApi/
│
├── 📄 package.json                    # Dependencias y scripts npm
├── 📄 docker-compose.dev.yaml         # Contenedor MariaDB para desarrollo
│
├── 🔧 config.sample.yaml              # Template de configuración (commitable)
├── 🔧 config.local.yaml               # Configuración local (no commitar)
├── 🔒 .env                            # Variables de entorno para Docker
│
├── 📋 zoo.postman_collection.json     # Suite de tests automáticos Postman
├── 📄 README.md                       # Este archivo
│
├── 📁 db/
│   └── init.sql                      # Script SQL: creación de tablas e índices
│
└── 📁 src/                            # Código fuente
    ├── app.js                         # Punto de entrada — Express + rutas + middlewares
    │
    ├── configuration/
    │   ├── configuration.js           # Carga y parseo del YAML de configuración
    │   └── database.js                # Pool de conexiones Knex + MariaDB
    │
    ├── route/
    │   ├── animales.js                # Rutas /animales con validadores
    │   └── habitats.js                # Rutas /habitats con validadores
    │
    ├── controller/
    │   ├── animales.js                # Lógica de control y respuestas HTTP de animales
    │   └── habitats.js                # Lógica de control y respuestas HTTP de hábitats
    │
    ├── service/
    │   ├── animales.js                # Queries SQL de animales (Knex)
    │   └── habitats.js                # Queries SQL de hábitats (Knex)
    │
    ├── validators/
    │   ├── animales.js                # Reglas de validación de animales
    │   └── habitats.js                # Reglas de validación de hábitats
    │
    └── middlewares/
        ├── errorHandler.js            # Manejo centralizado de errores
        └── validateResult.js          # Procesamiento de resultados de validación
```

### Flujo de Datos

```text
Cliente HTTP / Postman
         ↓
   Express Router
   (route/animales.js | route/habitats.js)
         ↓
   Validators (express-validator)
   + validateResult middleware
         ↓
   Controller Layer
   (controller/animales.js | controller/habitats.js)
   Lógica de negocio + respuestas HTTP
         ↓
   Service Layer
   (service/animales.js | service/habitats.js)
   Queries dinámicas con Knex.js
         ↓
   MariaDB (Docker)
   (zoo_db)
```

---

## 📚 Ejemplos de Uso

### Crear un Hábitat

```bash
curl -X POST http://localhost:8080/habitats \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Sabana Africana",
    "descripcion": "Llanuras con acacias y pastizales",
    "clima": "Tropical"
  }'
```

**Respuesta (201 Created):**
```json
{ "id": 1, "nombre": "Sabana Africana", "descripcion": "Llanuras con acacias y pastizales", "clima": "Tropical" }
```

### Crear un Animal

```bash
curl -X POST http://localhost:8080/animales \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Simba",
    "especie": "León",
    "edad": 5,
    "peso": 190,
    "habitatId": 1
  }'
```

**Respuesta (201 Created):**
```json
{ "id": 1, "nombre": "Simba", "especie": "León", "edad": 5, "peso": 190, "habitatId": 1 }
```

### Buscar Animales por Nombre

```bash
curl "http://localhost:8080/animales?nombre=simba"
```

### Obtener Hábitat con sus Animales

```bash
curl "http://localhost:8080/habitats/1/animales"
```

### Intentar eliminar un Hábitat con Animales

```bash
curl -X DELETE http://localhost:8080/habitats/1
```

**Respuesta (400 Bad Request):**
```json
{ "error": "No se puede eliminar el hábitat. Contiene animales asociados." }
```

---

## 📬 Pruebas con Postman

El proyecto incluye una colección Postman con **3+ tests automáticos por endpoint**:

```
zoo.postman_collection.json
```

**Pasos para importarla:**
1. Abre Postman
2. Haz clic en **Import**
3. Selecciona el archivo `zoo.postman_collection.json`
4. Asegúrate de que el servidor está corriendo en `localhost:8080`
5. Haz clic en los 3 puntos de la colección → **Run Collection**

### Checklist de Validación

```text
[ ] GET  /habitats                     → devuelve array de hábitats
[ ] GET  /habitats/:id                 → devuelve el hábitat o 404
[ ] GET  /habitats/:id/animales        → hábitat con lista de animales
[ ] POST /habitats                     → crea y devuelve 201
[ ] PUT  /habitats/:id                 → actualiza y devuelve 200
[ ] DELETE /habitats/:id (sin anim.)  → elimina y devuelve 204
[ ] DELETE /habitats/:id (con anim.)  → devuelve 400

[ ] GET  /animales                     → devuelve array de animales
[ ] GET  /animales?nombre=xxx          → filtra por nombre (LIKE)
[ ] GET  /animales/:id                 → devuelve el animal o 404
[ ] GET  /animales/habitat/:id         → animales del hábitat
[ ] POST /animales                     → crea y devuelve 201
[ ] PUT  /animales/:id                 → actualiza y devuelve 200
[ ] DELETE /animales/:id               → elimina y devuelve 204

[ ] POST sin campos obligatorios       → devuelve 400
[ ] POST con nombre duplicado          → devuelve 409 conflict
[ ] POST con habitatId inexistente     → devuelve 400/404
```

### Tests Incluidos por Recurso

| Recurso | Tests |
|---------|-------|
| **Hábitats — GET** | Status 200, JSON Array, Búsqueda LIKE |
| **Hábitats — POST** | Status 201, Campos obligatorios, Unicidad de nombre |
| **Hábitats — DELETE** | Status 400 si hay animales, Status 204 si está vacío |
| **Animales — GET** | Status 200, Incluye datos, Búsqueda por nombre |
| **Animales — POST** | Status 201, Validación de edad, Validación de peso |
| **Animales — PUT** | Status 200, Actualización correcta, Validación de datos |

---

## 🔧 Solución de Problemas

### ❌ `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Causa:** MariaDB no está corriendo.

```bash
docker ps -a
docker-compose -f docker-compose.dev.yaml up -d
docker logs <container_id>
```

### ❌ `Error: YAML config file not found`

**Causa:** Falta el archivo `config.local.yaml`.

```bash
cp config.sample.yaml config.local.yaml
# Edita con tus credenciales
```

### ❌ `409 Conflict` al crear un recurso

**Causa:** Ya existe un registro con ese nombre.

- Verifica con `GET /animales?nombre=XXX` o `GET /habitats?nombre=XXX`
- Usa un nombre diferente o elimina el duplicado primero

### ❌ `400 Bad Request` al eliminar un hábitat

**Causa:** El hábitat tiene animales asociados.

1. Mueve o elimina los animales del hábitat
2. Vuelve a intentar el `DELETE /habitats/:id`

### ❌ Puerto 8080 ya en uso

```bash
# Cambia el puerto en config.local.yaml:
service:
  port: 8081

# O en Windows, libera el puerto:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### ❌ `npm: no se reconoce el comando`

1. Descarga Node.js ≥ 18 desde [nodejs.org](https://nodejs.org/)
2. Instala y verifica: `node -v && npm -v`
3. Ejecuta `npm install` de nuevo

---

## 👤 Autor

<div align="center">
   <table>
      <tr>
         <td align="center">
            <a href="https://github.com/Javiii3r">
               <img src="https://avatars.githubusercontent.com/u/232877625?v=4" width="100px;" alt="Javi"/><br />
               <sub><b>Javi</b></sub>
            </a>
            <br />
            <p><strong>Full Stack Developer</strong></p>
         </td>
      </tr>
   </table>
</div>

## 🏆 Créditos y Agradecimientos

<div align="center">
   <p>Proyecto desarrollado como parte de la <strong>1ª Evaluación</strong> del ciclo formativo <strong>DAW — Desarrollo de Aplicaciones Web</strong>.</p>

   **Desarrollado con ❤️ para Zoo API**

   ---

   Agradecimientos a:
   - **Express.js** — Por su simplicidad y potencia como framework HTTP
   - **Knex.js** — Por hacer las consultas SQL elegantes y mantenibles
   - **express-validator** — Por las validaciones declarativas y limpias
   - **La comunidad open source** — Por las herramientas e inspiración
</div>

---

## 📝 Licencia

Este proyecto es de código abierto bajo la licencia **MIT**.