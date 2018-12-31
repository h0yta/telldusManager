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

const lastAction = async (input, timeframe) => {
  let devices = await getDevices();
  let filtered = devices.device
    .filter(device => device.type === 'device')
    .filter(device => doesDeviceMatch(device, input));

  if (filtered.length === 1) {
    let d = new Date();
    let history = await api.device.history(filtered[0], (d.getTime() - (timeframe * 1000)) / 1000, d.getTime() / 1000);
    if (history.history.length > 0) {
      return history.history[0];
    }

    return { state: 2 };
  }
}

exports.list = getDevices;
exports.turnOn = turnOn;
exports.turnOff = turnOff;
exports.lastAction = lastAction;