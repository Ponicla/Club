CREATE DATABASE socio;

CREATE TABLE socio(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40)
);

INSERT INTO socio(nombre) VALUES
    ('joaquin'),
    ('juan'),
    ('marcial');