const api = require('../api');

const getDevices = async () => {
  return api.Device.list();
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
    .map(api.Device.turnOn);
}

const turnOff = async (input) => {
  let devices = await getDevices();
  devices.device
    .filter(device => device.type === 'device')
    .filter(device => doesDeviceMatch(device, input))
    .map(api.Device.turnOff);
}

exports.turnOn = turnOn;
exports.turnOff = turnOff;