const telldus = require('../telldus');
const keys = require('../../settings/keys.json');
const dateFormat = require('dateformat');
const log = require('loglevel');
const { Client } = require('pg');

const run = async (settings) => {
    let temp = await telldus.temp(settings.sensorDevice);

    const client = new Client(keys.postgres);
    await client.connect()

    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO telldus.temperature(temperature_time, temperature_location, temperature_value) VALUES($1, $2, $3)',
            [dateFormat(new Date(), "yyyy-mm-dd HH:MM"), settings.sensorDevice, temp]);
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.end();
    }
}

exports.run = run;