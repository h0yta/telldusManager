const telldus = require('../telldus');
const settings = require('../../settings/manager.json');

const run = async (settings) => {
  let result = await runHobbyrum(settings);
  return result;
}

const runHobbyrum = async (settings) => {
  let humidity = await telldus.humidity('hobbyrum');

  if (humidity >= settings.threshold && settings.status === 'off') {
    console.log(humidity + ' is to damp, lets dehumidify this place');
    telldus.turnOn('Avfuktare hobbyrum');
    telldus.sendText("oscar", "Avfuktare PÅ");
    return 'on';
  } else if (humidity < settings.threshold && settings.status === 'on') {
    console.log(humidity + ' is not to damp');
    telldus.turnOff('Avfuktare hobbyrum');
    telldus.sendText("oscar", "Avfuktare AV");
    return 'off';
  } else {
    console.log('Humidity unchanged');
    return settings.status;
  }
}

exports.run = run;