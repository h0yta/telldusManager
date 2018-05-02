const api = require('../api');

const getDevices = async () => {
  return api.device.list();
}

const isNumber = (input) => {
  let onlyNumbers = /^\d+$/;
  return onlyNumbers.exec(input);
}

const doesDeviceMatch = (device, input) => {
  if (isNumber(input)) {
    return device.id === input;
  } else if (input.toUpperCase() === 'ALL') {
    return true;
  } else {
    return device.name.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }
}

const turnOn = async (input) => {
  let devices = await getDevices();
  devices.device
    .filter(device => device.type === 'device')
    .filter(device => doesDeviceMatch(device, input))
    .map(api.device.turnOn);
}

const turnOff = async (input) => {
  let devices = await getDevices();
  devices.device
    .filter(device => device.type === 'device')
    .filter(device => doesDeviceMatch(device, input))
    .map(api.device.turnOff);
}

exports.list = getDevices;
exports.turnOn = turnOn;
exports.turnOff = turnOff;