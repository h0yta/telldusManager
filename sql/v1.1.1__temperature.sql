DROP TABLE IF EXISTS telldus.temperature;
DROP SEQUENCE IF EXISTS telldus.temperature_id_seq;

CREATE SEQUENCE telldus.temperature_id_seq;
ALTER SEQUENCE telldus.temperature_id_seq OWNER TO pi;

CREATE TABLE telldus.temperature
(
    temperature_time timestamp without time zone NOT NULL,
    temperature_id integer NOT NULL DEFAULT nextval('telldus.temperature_id_seq'::regclass),
    temperature_location character varying(32) NOT NULL,
    temperature_value numeric NOT NULL,
    CONSTRAINT temperature_pkey PRIMARY KEY (temperature_id)
);
ALTER TABLE telldus.temperature OWNER to pi;