CREATE DATABASE agrocosts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    cpf VARCHAR,
    email VARCHAR
);


CREATE TABLE IF NOT EXISTS farms (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    inscription VARCHAR,
    location VARCHAR,
    acre VARCHAR
);

CREATE TABLE IF NOT EXISTS products (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    code VARCHAR,
    description VARCHAR,
    quantity int,
    unit_value int,
    total_value int,
    quantity_acre int,
    area_id UUID,

    FOREIGN KEY (area_id) REFERENCES farms(id)
);

CREATE TABLE IF NOT EXISTS harvests (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    current_harvest VARCHAR,
    description VARCHAR,
    start_date DATE,
    end_date DATE
);

CREATE TABLE IF NOT EXISTS ends_harvests (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    quantity_harvested INT,
    area_id UUID,

    FOREIGN KEY (area_id) REFERENCES farms(id)
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    explored_culture VARCHAR,
    harvest_reference UUID,

    FOREIGN KEY (harvest_reference) REFERENCES harvests(id)
);
