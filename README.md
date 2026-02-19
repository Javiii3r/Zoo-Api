# 🦁 Zoo API v2 - API REST para Gestión de Zoológico

API REST profesional y completa para la gestión de animales y hábitats de un zoológico, construida con **Node.js, Express 5, Knex y MariaDB**. La versión 2 introduce una arquitectura robusta con búsqueda dinámica, validación de datos avanzada y gestión de integridad referencial.

---

## 📋 Características y Endpoints

### 🦒 Animales (CRUD Completo)
- `GET /animales` - Obtener todos los animales (incluye información del hábitat vía JOIN). **Soporta búsqueda por nombre** mediante `?nombre=`.
- `GET /animales/:id` - Obtener un animal específico por su ID.
- `GET /animales/habitat/:id` - Listar animales que pertenecen a un hábitat específico.
- `POST /animales` - Crear un nuevo animal (**Validado por express-validator**).
- `PUT /animales/:id` - Actualizar datos de un animal.
- `DELETE /animales/:id` - Eliminar un registro de la base de datos.

### 🌿 Hábitats (CRUD Completo)
- `GET /habitats` - Obtener el listado de todos los hábitats. **Soporta búsqueda por nombre** mediante `?nombre=`.
- `GET /habitats/:id` - Obtener un hábitat específico.
- `GET /habitats/:id/animales` - Obtener un hábitat junto con su lista de animales residentes.
- `POST /habitats` - Crear un nuevo hábitat (Validado contra duplicados).
- `PUT /habitats/:id` - Actualizar un hábitat existente.
- `DELETE /habitats/:id` - Eliminar un hábitat. **Incluye gestión de integridad**: impide el borrado si existen animales asociados (Error 400).

---

## 🚀 Instalación y Puesta en Marcha

### Requisitos Previos
- **Node.js** (v18 o superior recomendado)
- **Docker Desktop** instalado y corriendo
- **Postman** (para la ejecución de la suite de tests automáticos)

### Paso 1: Instalar Dependencias
```bash
npm install

```

### Paso 2: Configurar Variables de Entorno

Asegúrate de tener los archivos de configuración con las credenciales:

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

### Paso 4: Iniciar el Servidor de la API

```bash
npm start

```

---

## 🧪 Pruebas y Validación

### Validación de Datos e Integridad

La API valida automáticamente los campos y protege la base de datos:

* **Búsqueda Dinámica:** Los listados permiten filtrar mediante el operador `LIKE` para coincidencias parciales.
* **Integridad Referencial:** El sistema impide eliminar hábitats que contengan animales, devolviendo un error controlado.
* **Manejo de Errores:** Respuestas estandarizadas para errores 400 (Bad Request), 404 (Not Found) y 409 (Conflict).

### Colección de Postman (Tests Automáticos)

El archivo `zoo.postman_collection.json` incluye scripts de prueba en JavaScript. Cada petición realiza al menos **3 tests automáticos**:

1. **Status Code:** Verifica que el código HTTP sea el esperado (200, 201, 204, etc.).
2. **Schema:** Valida que la respuesta sea un JSON con el formato correcto (Objeto o Array).
3. **Data Integrity:** Comprueba que los valores devueltos (como nombres o IDs) coincidan con lo solicitado.

### Ejemplos de cURL

**Buscar animal por nombre:**

```bash
curl http://localhost:8080/animales?nombre=Simba

```

**Crear un hábitat:**

```bash
curl -X POST http://localhost:8080/habitats -H "Content-Type: application/json" -d "{\"nombre\":\"Sabana\",\"descripcion\":\"Bioma cálido\",\"clima\":\"Seco\"}"

```

---

## 📁 Estructura del Proyecto

```text
zoo-api/
├── db/
│   └── init.sql              # Script de inicialización SQL
├── src/
│   ├── configuration/        # Carga de YAML y conexión Knex
│   ├── controller/           # Lógica: Gestión de búsqueda e integridad
│   ├── middlewares/          # errorHandler.js y validateResult.js
│   ├── route/                # Rutas con validadores inyectados
│   ├── service/              # Capa de datos: Consultas Knex dinámicas
│   ├── validators/           # Reglas de validación (animales/habitats)
│   └── app.js                # Entrada y Error Handler Global
├── docker-compose.dev.yaml   # Configuración de Docker
└── zoo.postman_collection.json  # Suite de tests automáticos

```

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia **MIT**.