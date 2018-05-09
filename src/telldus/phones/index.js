const api = require('../api');

const getPhones = async () => {
  return api.phone.list();
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

const sendText = async (input, message) => {
  let phones = await getPhones();
  let filteredPhones = phones.phone
    .filter(phone => doesDeviceMatch(phone, input));

  if (filteredPhones.length > 1) {
    console.error('To many matches for phone:', input);
    return;
  }

  await api.phone.sendPushText(filteredPhones.pop(), message);
}

exports.list = getPhones;
exports.sendText = sendText;