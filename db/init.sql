USE animals;

CREATE TABLE animals (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(100) NOT NULL,
    habitat VARCHAR(100),
    colour VARCHAR(50)
);

INSERT INTO animals (name, species, habitat, colour) VALUES
    ('Simba', 'León', 'Sabana', Marron_Amarillo),
    ('Dumbo', 'Elefante', 'Selva', Gris),
    ('Marty', 'Cebra', 'Sabana', Negra_Blanca);
