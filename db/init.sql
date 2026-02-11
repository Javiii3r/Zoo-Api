CREATE DATABASE zoo_db;
USE zoo_db;

CREATE TABLE habitats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    clima VARCHAR(100),
    imagen_url VARCHAR(255)
);

CREATE TABLE animales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    categoria ENUM('Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez') NOT NULL,
    edad INT,
    estado_salud ENUM('Saludable', 'Requiere atención') NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    habitat_id INT NOT NULL,
    
    FOREIGN KEY (habitat_id) 
        REFERENCES habitats(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);