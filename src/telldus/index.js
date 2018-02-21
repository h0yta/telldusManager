const devices = require('./devices');
const scenes = require('./scenes');

const getDevices = async () => {
  return api.Device.list();
}

const turnOn = async (input) => {
  await devices.turnOn(input);
}

const turnOff = async (input) => {
  await devices.turnOff(input);
}

const scene = async (input) => {
  console.log('input', input);
  await scenes.create(input);
}

exports.turnOn = turnOn;
exports.turnOff = turnOff;
exports.scene = scene;
