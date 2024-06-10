CREATE DATABASE agrocosts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    cpf VARCHAR,
    email VARCHAR UNIQUE,
    senha VARCHAR,
    ie VARCHAR
);

CREATE TABLE IF NOT EXISTS farms (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    ie VARCHAR,
    size VARCHAR,
    location VARCHAR,
    user_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS products (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    description VARCHAR,
    quantity INT,
    aplication_area VARCHAR,
    unit_value INT,
    total_value INT,
    farm_id UUID,
    harvest_id UUID,
    FOREIGN KEY (farm_id) REFERENCES farms(id),
    FOREIGN KEY (harvest_id) REFERENCES harvests(id)
);

CREATE TABLE IF NOT EXISTS harvests (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR,
    start_date DATE,
    end_date DATE
);

-- CREATE TABLE IF NOT EXISTS ends_harvests (
--     id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
--     quantity_harvested INT,
--     area_id UUID,

--     FOREIGN KEY (area_id) REFERENCES farms(id)
-- );

CREATE TABLE IF NOT EXISTS reports (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    explored_culture VARCHAR,
    harvest_reference UUID,

    FOREIGN KEY (harvest_reference) REFERENCES harvests(id)
);
