DROP TABLE IF EXISTS telldus.humidity;
DROP SEQUENCE IF EXISTS telldus.humidity_id_seq;

CREATE SEQUENCE telldus.humidity_id_seq;
ALTER SEQUENCE telldus.humidity_id_seq OWNER TO pi;

CREATE TABLE telldus.humidity
(
    humidity_time timestamp without time zone NOT NULL,
    humidity_id integer NOT NULL DEFAULT nextval('telldus.humidity_id_seq'::regclass),
    humidity_location character varying(32) NOT NULL,
    humidity_value numeric NOT NULL,
    CONSTRAINT humidity_pkey PRIMARY KEY (humidity_id)
);
ALTER TABLE telldus.humidity OWNER to pi;