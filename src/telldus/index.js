const devices = require('./devices');
const sensors = require('./sensors');
const scenes = require('./scenes');

const listDevices = async () => {
  return devices.list();
}

const listSensors = async () => {
  return sensors.list();
}

const temp = async (input) => {
  let temp = await sensors.temp(input);
  return temp;
}

const turnOn = async (input) => {
  await devices.turnOn(input);
}

const turnOff = async (input) => {
  await devices.turnOff(input);
}

const scene = async (input) => {
  await scenes.create(input);
}

exports.listDevices = listDevices;
exports.listSensors = listSensors;
exports.temp = temp;
exports.turnOn = turnOn;
exports.turnOff = turnOff;
exports.scene = scene;
