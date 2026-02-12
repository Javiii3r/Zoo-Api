# 🦁 Zoo API

**Zoo API** es una solución robusta desarrollada con **Node.js** y **Express** para la gestión integral de un zoológico. El sistema permite administrar de forma eficiente tanto a los animales como sus hábitats, garantizando la integridad de los datos mediante una arquitectura profesional y un entorno de base de datos contenedorizado con **Docker**.

---

## 🚀 Características principales

* 🐾 **Gestión Completa de Animales (CRUD)**: Registro, consulta, actualización y baja de especies con validaciones de salud y categoría.
* 🌿 **Administración de Hábitats**: Control total sobre los entornos del zoo (climas, descripciones y tipos).
* 🛡️ **Integridad Referencial**: Sistema de base de datos configurado con *Foreign Keys* para asegurar que cada animal pertenezca a un hábitat válido.
* 🐳 **Entorno Dockerizado**: Despliegue inmediato de la base de datos MariaDB mediante contenedores, evitando configuraciones manuales en el sistema local.
* ⚙️ **Arquitectura desacoplada**: Implementación del patrón **Controller-Service-Repository** para un código limpio y escalable.

---

## 🧰 Tecnologías utilizadas

| Tecnología | Uso |
| :--- | :--- |
| **Node.js** | Entorno de ejecución para el backend |
| **Express** | Framework web para la creación de rutas y API |
| **MariaDB** | Sistema de gestión de base de datos relacional |
| **Docker** | Contenedorización de la infraestructura de datos |
| **Knex.js** | Query Builder de SQL para facilitar las consultas |
| **YAML** | Gestión de configuraciones de entorno externas |

---

## 🏁 Instalación y puesta en marcha

Sigue estos pasos para tener la API corriendo en menos de 2 minutos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/zoo-api.git](https://github.com/tu-usuario/zoo-api.git)
cd zoo-api

```

### 2. Instalar dependencias

```bash
npm install

```

### 3. Levantar la base de datos

Asegúrate de tener Docker Desktop abierto y ejecuta:

```bash
docker compose -f docker-compose.dev.yaml up -d

```

### 4. Iniciar la API

```bash
node src/app.js

```

La API estará disponible en `http://localhost:3000`.

---

## 📍 Endpoints principales

### 🐯 Animales (`/api/animals`)

* `GET /` - Listar todos los animales.
* `GET /:id` - Obtener detalle de un animal específico.
* `POST /` - Registrar un nuevo animal (requiere `habitat_id` válido).
* `PUT /:id` - Actualizar información de un animal.
* `DELETE /:id` - Eliminar un animal del sistema.

### 🌴 Hábitats (`/api/habitats`)

* `GET /` - Listar todos los hábitats disponibles.
* `POST /` - Crear un nuevo entorno.

---

## 🕒 Mantenimiento y Colaboración

⚠️ Este proyecto es un desarrollo personal educativo. Siéntete libre de abrir un **Issue** o enviar un **Pull Request** para colaborar en la expansión del zoo.

## 🪪 Licencia

Este proyecto está bajo la licencia de **Javier López**. Si utilizas parte del código, por favor acredita el proyecto original.