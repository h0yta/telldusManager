const Promise = require('Promise');
const api = require('../api');

const getSensors = async () => {
  return api.sensor.list();
}

const isNumber = (input) => {
  let onlyNumbers = /^\d+$/;
  return onlyNumbers.exec(input);
}

const doesDeviceMatch = (sensor, input) => {
  if (isNumber(input)) {
    return sensor.id === input;
  } else if (input.toUpperCase() === 'ALL') {
    return true;
  } else {
    return sensor.name.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }
}

const temp = async (input) => {
  let sensors = await getSensors();
  let filteredSensors = sensors.sensor
    .filter(sensor => doesDeviceMatch(sensor, input));

  if (filteredSensors.length > 1) {
    console.error('To many matches for sensor:', input);
    return;
  }

  let infos = await Promise.all(filteredSensors.map(async (sensor) => {
    const info = await api.sensor.info(sensor);
    return info;
  }));

  return infos.map(info => getValue(info.data, 'temp'))
    .pop();
}

const getValue = (data, name) => {
  return data.filter(da => da.name === name)
    .map(da => da.value)
    .pop();
}

exports.list = getSensors;
exports.temp = temp;