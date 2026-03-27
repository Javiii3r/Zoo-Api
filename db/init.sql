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
('Sabana Africana', 'Amplio espacio que recrea el ecosistema de la sabana africana', 'Tropical seco', 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/02/07/5fa43a16ca53b.jpeg'),

('Amazonía', 'Selva tropical húmeda con vegetación densa', 'Tropical húmedo', 'https://www.mashpilodge.com/wp-content/uploads/2025/07/AdobeStock_1042605634-scaled.jpeg'),

('Zona Ártica', 'Hábitat frío con piscinas y zonas de hielo', 'Polar', 'https://humanidades.com/wp-content/uploads/2018/07/oceano-artico-1-e1571703926449.jpg'),

('Bosque Templado', 'Bosque con vegetación abundante y clima moderado', 'Templado', 'https://stoa.com.es/wp-content/uploads/2025/06/Foto.png'),

('Desierto', 'Zona árida con dunas y temperaturas extremas', 'Árido', 'https://img.freepik.com/foto-gratis/gran-montana-rocosa-desierto_181624-8795.jpg?semt=ais_rp_progressive&w=740&q=80');

INSERT INTO animales (nombre, especie, categoria, edad, estado_salud, descripcion, imagen_url, habitat_id) VALUES
('Simba', 'León africano', 'Mamífero', 5, 'Saludable', 'León macho de melena dorada', 'https://upload.wikimedia.org/wikipedia/commons/7/77/002_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg', 1),

('Lola','Guacamayo azul','Ave',3,'Saludable','Guacamayo de plumaje azul brillante','https://www.clarin.com/2025/09/29/GmMvkhDM7_2000x1500__1.jpg',2),

('Polar','Oso polar','Mamífero',8,'Requiere atención','Oso polar en control veterinario rutinario','https://mymodernmet.com/wp/wp-content/uploads/2020/12/how-to-draw-a-polar-bear-photo-1.jpg',3),

('Bamboo','Oso panda','Mamífero',2,'Saludable','Pequeño panda amante del bambú','https://static.wikia.nocookie.net/osos-panda/images/1/11/140526-fotos-osos-pandas-pardos-bebes-rojos-imagenes-ositos-rojo-imajen-fotografia.jpg/revision/latest?cb=20150510000021&path-prefix=es',4),

('Sandy','Camello','Mamífero',7,'Saludable','Camello adaptado al desierto','https://cdn.sanity.io/images/esqfj3od/production/73fdd53c296c1be330ca1ff9b3675cbc8e14f5c0-1080x720.webp?w=3840&q=65&fit=clip&auto=format',5),

('Nala', 'León africano', 'Mamífero', 4, 'Saludable', 'Leona rápida y cazadora', 'https://elements-resized.envatousercontent.com/elements-video-cover-images/66b657a8-f631-442f-bdb3-ad55e71cc68b/video_preview/video_preview_0000.jpg?w=500&cf_fit=cover&q=85&format=auto&s=d1afbba7c306911987cfb2204f541b12863fd2a0f7efa9e152f74ce2bb433b3e', 1),

('Sombra','Jaguar','Mamífero',6,'Saludable','Gran felino de la selva','https://cdn0.ecologiaverde.com/es/posts/6/0/7/jaguar_5706_600.jpg',2),

('Nieve','Zorro ártico','Mamífero',3,'Saludable','Pequeño zorro adaptado al frío','https://cdn0.ecologiaverde.com/es/posts/8/5/9/zorro_artico_5958_orig.jpg',3),

('Hoja','Ciervo','Mamífero',2,'Saludable','Herbívoro típico de bosques','https://www.eekwi.org/sites/default/files/deerfawn.jpg',4),

('Rayo','Zorro fénec','Mamífero',2,'Saludable','Pequeño zorro del desierto','https://cdn0.ecologiaverde.com/es/posts/4/9/8/fennec_5894_orig.jpg',5),

('Rayas', 'Cebra común', 'Mamífero', 1, 'Saludable', 'Cebra con patrón de rayas único', 'https://img.freepik.com/fotos-premium/comun-o-cebra-comun-equus-quagga-ejecutando-praderas-parque-nacional-masai-mara-kenya_780595-541.jpg', 1),

('Lento','Perezoso','Mamífero',5,'Saludable','Animal arborícola muy tranquilo','https://laderasur.com/wp-content/uploads/2022/08/perezosos-tres-dedos-creditos-sloth-conservation-2.jpg',2),

('Pluma Blanca','Búho nival','Ave',4,'Saludable','Ave rapaz blanca del ártico','https://cdn0.ecologiaverde.com/es/posts/5/9/1/buho_nival_caracteristicas_donde_vive_y_que_come_4195_orig.jpg',3),

('Rojo','Zorro rojo','Mamífero',4,'Saludable','Zorro ágil y cazador','https://humanidades.com/wp-content/uploads/2018/08/Zorro-rojo-min-e1535633714631.jpg',4),

('Escama','Serpiente de cascabel','Reptil',4,'Saludable','Serpiente venenosa del desierto','https://upload.wikimedia.org/wikipedia/commons/d/d4/Crotalus_ruber_02.jpg',5),

('Gigante', 'Elefante africano', 'Mamífero', 12, 'Saludable', 'El animal terrestre más grande', 'https://static.wikia.nocookie.net/reinoanimalia/images/9/9f/Elefantes-foto-adobe-stock.jpg/revision/latest?cb=20250825141330&path-prefix=es', 1),

('Salto','Rana venenosa','Anfibio',2,'Saludable','Rana de colores brillantes','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRIdBd2aJUWh9N4OCchA3g1eZkSG-k0Y1kvg&s',2),

('Aleta','Foca','Mamífero',6,'Saludable','Mamífero marino ágil','https://www.anipedia.net/imagenes/fotos-focas-800x375.jpg',3),

('Pluma','Búho real','Ave',5,'Saludable','Ave nocturna de gran tamaño','https://seo.org/wp-content/uploads/2013/11/F333_Foto_03.jpg',4),

('Pico','Correcaminos','Ave',3,'Saludable','Ave veloz del desierto','https://inaturalist-open-data.s3.amazonaws.com/photos/30254311/large.jpg',5),

('Manchas', 'Jirafa', 'Mamífero', 2, 'Saludable', 'Jirafa alta de cuello largo', 'https://www.sedema.cdmx.gob.mx/storage/app/uploads/public/60c/37d/ff0/60c37dff08b0e813158031.jpeg', 1),

('Escamas','Anaconda','Reptil',9,'Requiere atención','Gran serpiente amazónica','https://www.cam.ac.uk/sites/default/files/shorthand/251955/KyJGTQGuZA/assets/JNBvif6q0t/3.-anaconda-credit-andres-alfonso-rojascrop-2560x1440.jpg',2),

('Colmillo','Morsa','Mamífero',11,'Saludable','Gran mamífero marino con colmillos','https://upload.wikimedia.org/wikipedia/commons/f/f2/Pacific_Walrus_-_Bull_%288247646168%29_cropped.jpg',3),

('Saltos','Rana verde','Anfibio',2,'Saludable','Rana común de zonas húmedas','https://cdn0.expertoanimal.com/es/razas/9/0/5/rana-arboricola-verde_509_0_orig.jpg',4),

('Pinza','Escorpión','Reptil',1,'Saludable','Escorpión típico del desierto','https://humanidades.com/wp-content/uploads/2018/12/escorpion-2-e1584472396622.jpg',5);