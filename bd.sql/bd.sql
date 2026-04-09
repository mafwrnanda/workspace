/* 1. CREACIÓN DE LA BASE DE DATOS Y SELECCIÓN */
CREATE DATABASE dona_y_viste; -- Crea el contenedor principal de toda la información del proyecto.
USE dona_y_viste;             -- Indica al sistema que trabajaremos sobre esta base de datos.

/* 2. CREACIÓN DE TABLAS (ESTRUCTURA) */

CREATE TABLE INSTITUCION (
    codigo INT PRIMARY KEY,    -- Crea la tabla de colegios; el código es el identificador único.
    nombre VARCHAR(100),       -- Almacena el nombre de la institución educativa.
    direccion VARCHAR(150)     -- Almacena la ubicación física del colegio.
);

CREATE TABLE USUARIO (
    documento BIGINT PRIMARY KEY, -- Registra a los usuarios (padres/alumnos) usando su cédula o TI.
    nombre VARCHAR(100),          -- Guarda el nombre completo del usuario.
    telefono VARCHAR(20),         -- Para que los interesados puedan contactarse entre sí.
    correo VARCHAR(100)           -- Correo electrónico para notificaciones o registro.
);

CREATE TABLE UNIFORME (
    codigo INT PRIMARY KEY,       -- Identificador único para cada prenda registrada.
    tipo VARCHAR(50),             -- Especifica si es de diario, física, gala, etc.
    talla VARCHAR(10),            -- Indica el tamaño (S, M, L, 32, 34, etc.).
    estado VARCHAR(50),           -- Define si es "Nuevo", "Excelente" o "Buen estado".
    precio DECIMAL(10,2),         -- El costo de la prenda (0 si es para donación).
    genero VARCHAR(20),           -- Indica si es para hombre, mujer o unisex.
    codigo_institucion INT,       -- Relaciona el uniforme con un colegio específico.
    FOREIGN KEY (codigo_institucion) REFERENCES INSTITUCION(codigo) -- Asegura que el colegio exista.
);

CREATE TABLE SOLICITUD (
    id_solicitud INT PRIMARY KEY,   -- Identificador único de cada proceso de intercambio/venta.
    documento_usuario BIGINT,       -- Quién es el usuario que está interesado.
    codigo_uniforme INT,            -- Cuál es la prenda que se está solicitando.
    FOREIGN KEY (documento_usuario) REFERENCES USUARIO(documento), -- Vincula con la tabla Usuario.
    FOREIGN KEY (codigo_uniforme) REFERENCES UNIFORME(codigo)      -- Vincula con la tabla Uniforme.
);


/* 3. CONSULTAS DE INFORMACIÓN (SOLUCIÓN A LA ACTIVIDAD) */

-- 1. Listar el nombre y teléfono de los usuarios
SELECT nombre, telefono 
FROM USUARIO; -- Sirve para obtener un directorio de contacto de todas las personas registradas.

-- 2. Listar el nombre y la dirección de las instituciones
SELECT nombre, direccion 
FROM INSTITUCION; -- Sirve para ver qué colegios están vinculados al sistema y dónde están.

-- 3. Listar el tipo, la talla y el estado de los uniformes
SELECT tipo, talla, estado 
FROM UNIFORME; -- Sirve para que un interesado vea qué prendas hay disponibles sin ver precios ni colegios.

-- 4. Listar el nombre de los usuarios y el tipo de uniforme que solicitan
SELECT USUARIO.nombre, UNIFORME.tipo 
FROM SOLICITUD
JOIN USUARIO ON SOLICITUD.documento_usuario = USUARIO.documento
JOIN UNIFORME ON SOLICITUD.codigo_uniforme = UNIFORME.codigo; 
-- Sirve para que el administrador sepa qué persona específica está interesada en qué tipo de prenda.

-- 5. Listar el nombre de la institución y el tipo de uniforme que tiene
SELECT INSTITUCION.nombre, UNIFORME.tipo 
FROM UNIFORME
JOIN INSTITUCION ON UNIFORME.codigo_institucion = INSTITUCION.codigo;
-- Sirve para organizar el inventario y saber cuántas prendas pertenecen a cada colegio.