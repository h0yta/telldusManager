const devices = require('./devices');
const sensors = require('./sensors');
const scenes = require('./scenes');
const phones = require('./phones');

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

const humidity = async (input) => {
  let humidity = await sensors.humidity(input);
  return humidity;
}

const lastAction = async (input, timeframe) => {
  return await devices.lastAction(input, timeframe);
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

const sendText = async (input, message) => {
  await phones.sendText(input, message);
}

const sendTexts = async (inputs, message) => {
  await Promise.all(inputs.map(async (input) => {
    await phones.sendText(input, message);
  }));
}

exports.listDevices = listDevices;
exports.listSensors = listSensors;
exports.temp = temp;
exports.humidity = humidity;
exports.lastAction = lastAction;
exports.turnOn = turnOn;
exports.turnOff = turnOff;
exports.scene = scene;
exports.sendText = sendText;
exports.sendTexts = sendTexts;
