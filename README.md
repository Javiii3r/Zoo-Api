# 🦁 Zoo API v2 - API REST para Gestión de Zoológico

API REST profesional y completa para la gestión de animales y hábitats de un zoológico, construida con **Node.js, Express 5, Knex y MariaDB**. La versión 2 introduce una arquitectura robusta con validación de datos avanzada y manejo global de errores.

---

## 📋 Características y Endpoints

### 🦒 Animales (CRUD Completo)
- `GET /animales` - Obtener todos los animales (incluye información del hábitat vía JOIN).
- `GET /animales/:id` - Obtener un animal específico por su ID.
- `GET /animales/habitat/:id` - Listar animales que pertenecen a un hábitat específico.
- `POST /animales` - Crear un nuevo animal (**Validado por express-validator**).
- `PUT /animales/:id` - Actualizar datos de un animal.
- `DELETE /animales/:id` - Eliminar un registro de la base de datos.

### 🌿 Hábitats (CRUD Completo)
- `GET /habitats` - Obtener el listado de todos los hábitats.
- `GET /habitats/:id` - Obtener un hábitat específico.
- `GET /habitats/:id/animales` - Obtener un hábitat junto con su lista de animales residentes.
- `POST /habitats` - Crear un nuevo hábitat (Validado).
- `PUT /habitats/:id` - Actualizar un hábitat existente.
- `DELETE /habitats/:id` - Eliminar un hábitat.

---

## 🚀 Instalación y Puesta en Marcha

### Requisitos Previos
- **Node.js** (v18 o superior recomendado)
- **Docker Desktop** instalado y corriendo
- **Postman** (opcional, para pruebas rápidas)

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

Este comando automatiza:

* Descarga de MariaDB 11.3.2.
* Creación de la base de datos `zoo_db`.
* Ejecución de `db/init.sql` (tablas y datos de ejemplo).

### Paso 4: Iniciar el Servidor de la API

```bash
npm start

```

*Deberías ver: "Iniciando el backend en el puerto 8080"*

---

## 🧪 Pruebas y Validación

### Validación de Datos (v2)

La API valida automáticamente los campos del body. Si envías datos incorrectos, recibirás un **Error 400 (Bad Request)** con el siguiente formato:

```json
{
  "code": 400,
  "title": "bad-request",
  "errors": [
    { "type": "field", "msg": "Categoría no válida", "path": "categoria", "location": "body" }
  ]
}

```

### Ejemplos de cURL para Pruebas

**Obtener todos los animales:**

```bash
curl http://localhost:8080/animales

```

**Crear un nuevo animal:**

```bash
curl -X POST http://localhost:8080/animales -H "Content-Type: application/json" -d "{\"nombre\":\"Nala\",\"especie\":\"Leona\",\"categoria\":\"Mamífero\",\"habitat_id\":1}"

```

---

## 🛠️ Comandos Útiles

### Gestión de Docker

* **Ver contenedores activos:** `docker ps`
* **Ver logs de la base de datos:** `docker logs zoo-dev-db`
* **Reiniciar base de datos (borra y recrea datos):**
```bash
docker-compose -f docker-compose.dev.yaml down -v
docker-compose -f docker-compose.dev.yaml up -d

```



### Acceso Directo SQL

```bash
docker exec -it zoo-dev-db mysql -u zoo_user -p
# Password: zoo_password_2026

```

---

## 📁 Estructura del Proyecto

```text
zoo-api/
├── db/
│   └── init.sql              # Script de inicialización SQL
├── src/
│   ├── configuration/        # Carga de YAML y conexión Knex
│   ├── controller/           # Controladores (Lógica de negocio)
│   ├── middlewares/          # ✦ NUEVO: errorHandler.js y validateResult.js
│   ├── route/                # Rutas con validadores inyectados
│   ├── service/              # Capa de datos (Consultas Knex)
│   ├── validators/           # ✦ NUEVO: Reglas de validación (animales/habitats)
│   └── app.js                # Entrada y Error Handler Global
├── docker-compose.dev.yaml   # Configuración de Docker
└── zoo.postman_collection.json  # Colección para Postman

```

---

## 🐛 Solución de Problemas

* **Error: "Cannot connect to database":** Verifica que Docker Desktop esté corriendo.
* **Error: "Port 3306 already in use":** Tienes otro MySQL local activo; detén el servicio o cambia el puerto en `docker-compose.dev.yaml`.
* **Error: "Port 8080 already in use":** Otra app usa el puerto 8080; cámbialo en `config.local.yaml`.

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia **MIT**.

**¡Disfruta construyendo tu aplicación web del zoológico v2!** 🦒🐧🦁