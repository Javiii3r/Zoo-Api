
CREATE TABLE habitats (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    clima VARCHAR(50),
    imagen_url VARCHAR(255)
);

CREATE TABLE animales (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    categoria ENUM('Mamífero', 'Ave', 'Reptil', 'Anfibio', 'Pez') NOT NULL,
    edad INT UNSIGNED,
    estado_salud ENUM('Saludable', 'Requiere atención') DEFAULT 'Saludable',
    descripcion TEXT,
    imagen_url VARCHAR(255),
    habitat_id INT UNSIGNED,
    FOREIGN KEY (habitat_id) REFERENCES habitats(id) ON DELETE SET NULL
);

INSERT INTO habitats (nombre, descripcion, clima, imagen_url) VALUES
    ('Sabana Africana', 'Amplio espacio que recrea el ecosistema de la sabana africana', 'Tropical seco', 'https://example.com/sabana.jpg'),
    ('Amazonía', 'Selva tropical húmeda con vegetación densa', 'Tropical húmedo', 'https://example.com/amazonia.jpg'),
    ('Zona Ártica', 'Hábitat frío con piscinas y zonas de hielo', 'Polar', 'https://example.com/artico.jpg');

INSERT INTO animales (nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id) VALUES
    ('Simba', 'León africano', 'Mamífero', 5, 'Saludable', 'León macho de melena dorada', 'https://example.com/leon.jpg', 1),
    ('Lola', 'Guacamayo azul', 'Ave', 3, 'Saludable', 'Guacamayo de plumaje azul brillante', 'https://example.com/guacamayo.jpg', 2),
    ('Polar', 'Oso polar', 'Mamífero', 8, 'Requiere atención', 'Oso polar en control veterinario rutinario', 'https://example.com/oso.jpg', 3);