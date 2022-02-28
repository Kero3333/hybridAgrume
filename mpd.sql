CREATE TYPE family_type AS ENUM ('orange','clémentine','mandarine','pamplemousse','citron','kumquat')

CREATE TABLE specie (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    scientific_name text NOT NULL UNIQUE,
    specie_name text NOT NULL UNIQUE,
    family_name family_type NOT NULL,
);

CREATE TABLE cultivar (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL UNIQUE,
    juiciness smallint NOT NULL,
    bitterness smallint NOT NULL,
    id_specie integer NOT NULL,
    CONSTRAINT juiciness_possible_values CHECK (juiciness >= 0 AND juiciness <= 5)
    CONSTRAINT bitterness_possible_values CHECK (bitterness >= 0 AND bitterness <= 5)
);