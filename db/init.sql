CREATE DATABASE IF NOT EXISTS animals;
USE animals;

CREATE TABLE IF NOT EXISTS habitats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    clima VARCHAR(100),
    imagen_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS animales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    categoria ENUM('Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez') NOT NULL,
    edad INT,
    estado_salud ENUM('Saludable', 'Requiere atención') NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    habitat_id INT NOT NULL,
    FOREIGN KEY (habitat_id) REFERENCES habitats(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO habitats (id, nombre, descripcion, clima) VALUES 
(1, 'Sabana Africana', 'Llanuras abiertas con pocos árboles', 'Cálido'),
(2, 'Selva Tropical', 'Mucha vegetación y lluvia constante', 'Húmedo');