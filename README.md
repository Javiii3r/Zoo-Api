# 🦁 Zoo API v2 - API REST para Gestión de Zoológico

API REST profesional y completa para la gestión de animales y hábitats de un zoológico, construida con **Node.js, Express 5, Knex y MariaDB**. 

La versión 2 introduce una **arquitectura robusta de tres capas** (Controller → Service → Database), búsqueda dinámica con LIKE queries, validación avanzada de datos con express-validator, y gestión completa de integridad referencial.

---

## 📑 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Endpoints Disponibles](#endpoints-disponibles)
- [Requisitos Previos](#requisitos-previos)
- [Instalación Rápida](#instalación-rápida)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas Automáticas](#pruebas-automáticas)
- [Solución de Problemas](#solución-de-problemas)

---

## ✨ Características Principales

- ✅ **Validación de datos** con express-validator
- ✅ **Búsqueda dinámica** por nombre en animales y hábitats
- ✅ **Integridad referencial** automática (previene inconsistencias)
- ✅ **Paginación y filtrado** en listados
- ✅ **Manejo centralizado de errores** con respuestas estandarizadas
- ✅ **Tests automáticos** en Postman (3+ tests por endpoint)
- ✅ **Arquitectura escalable** con patrón Service/Repository

---

## 📋 Endpoints Disponibles

### 🦒 **Animales** - Gestión del Inventario

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/animales` | Listar todos con soporte búsqueda: `?nombre=leon` |
| `GET` | `/animales/:id` | Obtener detalles de un animal |
| `GET` | `/animales/habitat/:habitatId` | Animales de un hábitat específico |
| `POST` | `/animales` | Crear nuevo animal *(validado)* |
| `PUT` | `/animales/:id` | Actualizar datos de animal |
| `DELETE` | `/animales/:id` | Eliminar un animal |

**Campos requeridos en POST/PUT:**
```json
{
  "nombre": "string (único, 1-100 chars)",
  "especie": "string (1-100 chars)",
  "edad": "number (0-150)",
  "peso": "number (0.1-1000)",
  "habitatId": "number (debe existir)"
}
```

### 🌿 **Hábitats** - Gestión de Espacios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/habitats` | Listar todos con búsqueda: `?nombre=sabana` |
| `GET` | `/habitats/:id` | Obtener un hábitat |
| `GET` | `/habitats/:id/animales` | Hábitat + lista de animales |
| `POST` | `/habitats` | Crear nuevo hábitat *(único)* |
| `PUT` | `/habitats/:id` | Actualizar un hábitat |
| `DELETE` | `/habitats/:id` | Eliminar hábitat ⚠️ *sin animales* |

**Campos requeridos en POST/PUT:**
```json
{
  "nombre": "string (único, 1-100 chars)",
  "descripcion": "string (0-500 chars)",
  "clima": "string (ej: Tropical, Ártico)"
}
```

---

## 🚀 Requisitos Previos

| Software | Versión | Propósito |
|----------|---------|----------|
| **Node.js** | ≥ 18 | Runtime de JavaScript |
| **npm** | ≥ 9 | Gestor de dependencias |
| **Docker Desktop** | Última | Contenedor MariaDB |
| **Postman** | Última | Testing (opcional pero recomendado) |

---

## ⚡ Instalación Rápida

### 1️⃣ Instalar Dependencias

```bash
npm install
```

Esto instala:
- **express** v5 - Framework web
- **knex** - Query builder SQL
- **mariadb** - Driver de base de datos
- **express-validator** - Validación de datos
- **yaml** - Parseo de archivos de configuración

### 2️⃣ Configurar Variables de Entorno

Crea o edita los archivos de configuración con las credenciales (ya existen los templates):

**Archivo: `.env`** (o en `.env.local`)
```env
MARIADB_USER=zoo_user
MARIADB_PASSWORD=zoo_password_2026
MARIADB_DATABASE=zoo_db
MARIADB_ROOT_PASSWORD=root_password_2026
```

**Archivo: `config.local.yaml`**
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

> **💡 Nota:** Para producción, cambiar `nodeEnv` a `production` y usar credenciales seguras.

### 3️⃣ Iniciar la Base de Datos (Docker)

```bash
# Descargar imagen y crear contenedor MariaDB
docker-compose -f docker-compose.dev.yaml up -d
```

Verifica que está corriendo:
```bash
docker ps
# Deberías ver un contenedor con mariadb:latest
```

Conexión: `localhost:3306` | Usuario: `zoo_user` | Contraseña: `zoo_password_2026`

### 4️⃣ Iniciar el Servidor

```bash
npm start
```

✅ **Servidor activo en:**
```
http://localhost:8080
```

Para desarrollo con auto-reload (si está disponible):
```bash
npm run dev
```

---

---

## 📚 Ejemplos de Uso

### Ejemplo 1: Crear un Hábitat

```bash
curl -X POST http://localhost:8080/habitats \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Sabana Africana",
    "descripcion": "Hábitat savana con acacias y pastizales",
    "clima": "Tropical"
  }'
```

**Respuesta (201 Created):**
```json
{
  "id": 1,
  "nombre": "Sabana Africana",
  "descripcion": "Hábitat savana con acacias y pastizales",
  "clima": "Tropical"
}
```

### Ejemplo 2: Crear un Animal

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
{
  "id": 1,
  "nombre": "Simba",
  "especie": "León",
  "edad": 5,
  "peso": 190,
  "habitatId": 1
}
```

### Ejemplo 3: Buscar Animales por Nombre

```bash
curl "http://localhost:8080/animales?nombre=leon"
```

**Respuesta (200 OK):** Array con animales coincidentes

### Ejemplo 4: Obtener Hábitat con sus Animales

```bash
curl "http://localhost:8080/habitats/1/animales"
```

### Ejemplo 5: Listar Todos los Hábitats

```bash
curl "http://localhost:8080/habitats"
```

### Ejemplo 6: Intentar Eliminar Hábitat con Animales

```bash
curl -X DELETE http://localhost:8080/habitats/1
```

**Respuesta (400 Bad Request):**
```json
{
  "error": "No se puede eliminar el hábitat. Contiene animales asociados."
}
```

---

## 🧪 Pruebas Automáticas

### Suite de Tests en Postman

El archivo `zoo.postman_collection.json` contiene pruebas exhaustivas. Cada endpoint realiza **3+ tests**:

1. ✅ **Status Code** - Verifica el código HTTP correcto (200, 201, 204, 400, 404)
2. ✅ **Response Schema** - Valida que sea JSON válido (Object o Array)
3. ✅ **Data Integrity** - Comprueba valores esperados en la respuesta
4. ✅ **Validation Rules** - Verifica validaciones de express-validator

### Ejecución de Tests

1. **Importar colección en Postman:**
   - Abre Postman
   - Collections → Import → Selecciona `zoo.postman_collection.json`

2. **Ejecutar toda la suite:**
   - Click en los 3 puntos de la colección → **Run Collection**
   - Se ejecutarán todos los tests automáticamente

3. **Ver resultados:**
   - Postman mostrará ✅ o ❌ para cada test
   - Revisa la pestaña "Tests" en cada petición para más detalles

### Tests Incluidos

| Recurso | Tests |
|---------|-------|
| **Hábitats - GET** | Status 200, JSON Array, Búsqueda LIKE |
| **Hábitats - POST** | Status 201, Campos requeridos, Nombres únicos |
| **Hábitats - DELETE** | Status 400 si hay animales, Status 204 si está vacío |
| **Animales - GET** | Status 200, Incluye datos de hábitat, Búsqueda por nombre |
| **Animales - POST** | Status 201, Validación de edades, Validación de pesos |
| **Animales - PUT** | Status 200, Actualización parcial, Validación de datos |

---

## 🏗️ Arquitectura del Proyecto

### Patrón MVC + Service Layer

```
┌─────────────────────────────────┐
│  ROUTES (route/animales.js)     │  ← Definición de endpoints
└──────────────┬──────────────────┘
               │
        ┌──────▼──────────────────┐
        │ CONTROLLERS             │  ← Lógica de negocio
        │ (ctrl/animales.js)      │
        └──────┬──────────────────┘
               │
        ┌──────▼──────────────────┐
        │ SERVICES               │  ← Acceso a datos
        │ (service/animales.js)  │
        └──────┬──────────────────┘
               │
        ┌──────▼──────────────────┐
        │ DATABASE (Knex/MariaDB) │  ← Persistencia
        └─────────────────────────┘
```

### Componentes Principales

| Archivo | Responsabilidad |
|---------|-----------------|
| `app.js` | Inicialización Express, rutas, middleware global |
| `route/` | Mapeo HTTP → Controller, inyección de validadores |
| `controller/` | Parsing de request, llamadas a servicios, respuestas |
| `service/` | Queries SQL dinámicas, lógica de datos |
| `validators/` | Reglas de validación con express-validator |
| `middlewares/` | Error centr.izado, validación de results |
| `configuration/` | Carga de config YAML, Pool de conexiones Knex |

---

## 📁 Estructura del Proyecto

```
Zoo-Api/
├── 📄 package.json                    # Dependencias y scripts
├── 📄 docker-compose.dev.yaml         # Configuración Docker
│
├── 🔧 config.sample.yaml              # Template de configuración
├── 🔧 config.local.yaml               # Configuración local (no commitar)
│
├── 📋 zoo.postman_collection.json     # Suite de tests automáticos
├── 📄 README.md                       # Este archivo
│
├── 📁 db/                             # Inicialización de Base de Datos
│   └── init.sql                       # Script SQL: tablas, índices
│
└── 📁 src/                            # Código fuente
    ├── app.js                         # Entrada principal
    │
    ├── configuration/
    │   ├── configuration.js           # Carga de YAML
    │   └── database.js                # Configuración de Knex
    │
    ├── controller/
    │   ├── animales.js                # Lógica de animales
    │   └── habitats.js                # Lógica de hábitats
    │
    ├── service/
    │   ├── animales.js                # Queries animales
    │   └── habitats.js                # Queries hábitats
    │
    ├── route/
    │   ├── animales.js                # Rutas /animales
    │   └── habitats.js                # Rutas /habitats
    │
    ├── validators/
    │   ├── animales.js                # Reglas validación
    │   └── habitats.js                # Reglas validación
    │
    └── middlewares/
        ├── errorHandler.js            # Manejo centralizado de errores
        └── validateResult.js          # Procesamiento de validaciones
```

---

## ✅ Validación y Manejo de Errores

### Reglas de Validación

**Animales:**
- `nombre` - Requerido, único, 1-100 caracteres
- `especie` - Requerido, 1-100 caracteres
- `edad` - Número entre 0-150
- `peso` - Número entre 0.1-1000 kg
- `habitatId` - Número, debe existir en BD

**Hábitats:**
- `nombre` - Requerido, único, 1-100 caracteres
- `descripcion` - Opcional, máximo 500 caracteres
- `clima` - Requerido, 1-100 caracteres

### Códigos de Estado HTTP

| Código | Significado | Ejemplo |
|--------|------------|---------|
| `200` | OK - Petición exitosa | GET /animales |
| `201` | Created - Recurso creado | POST /habitats |
| `204` | No Content - Eliminado | DELETE /animales/:id |
| `400` | Bad Request - Datos inválidos | Hábitat con animales |
| `404` | Not Found - Recurso no existe | GET /animales/999 |
| `409` | Conflict - Violación de constraints | Nombre duplicado |
| `500` | Server Error - Error interno | Error de BD |

---

## 🔧 Solución de Problemas

### ❌ `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Problema:** MariaDB no está corriendo.

**Solución:**
```bash
# Verificar contenedores Docker
docker ps -a

# Si no está corriendo, iniciar
docker-compose -f docker-compose.dev.yaml up -d

# Ver logs del contenedor
docker logs <container_id>
```

### ❌ `Error: YAML config file not found`

**Problema:** El archivo de configuración no existe.

**Solución:**
```bash
# Copiar el template
cp config.sample.yaml config.local.yaml

# Editar con tus credenciales
```

### ❌ `ValidationError: campo "nombre" ya existe`

**Problema:** Intentas crear un registro con nombre duplicado.

**Solución:**
- Usa un nombre único
- Verifica que no exista en la BD: `GET /animales?nombre=XXX`

### ❌ `Cannot DELETE /habitats/1 - Error 400`

**Problema:** Intenta eliminar hábitat con animales.

**Solución:**
- Primero, mueve los animales a otro hábitat
- O elimina los animales: `DELETE /animales/:id`
- Luego elimina el hábitat

### ❌ Puerto 8080 ya en uso

**Problema:** Otra aplicación está usando el puerto.

**Solución:**
```bash
# Cambiar puerto en config.local.yaml
service:
  port: 8081  # Nuevo puerto

# O matar el proceso
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### ❌ `npm: no se reconoce el comando`

**Problema:** Node.js no está instalado.

**Solución:**
1. Descargar desde https://nodejs.org/ (≥18 LTS)
2. Instalar
3. Verificar: `node -v && npm -v`
4. Ejecutar `npm install` de nuevo

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Express.js](https://expressjs.com/) - Framework web
- [Knex.js](https://knexjs.org/) - Query builder
- [express-validator](https://express-validator.github.io/docs/) - Validación
- [MariaDB](https://mariadb.com/docs/) - Base de datos

### Cómo Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Realiza cambios y testa (`npm test`)
4. Commit: `git commit -am "Agregar feature"`
5. Push: `git push origin feature/nueva-funcionalidad`
6. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto bajo la licencia **MIT**.