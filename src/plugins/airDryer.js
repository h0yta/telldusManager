const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  let result = await runHobbyrum(settings);
  return result;
}

const runHobbyrum = async (settings) => {
  let humidity = await telldus.humidity('hobbyrum');

  if (humidity >= settings.threshold && settings.status === 'off') {
    log.debug(humidity + ' is to damp, lets dehumidify this place');
    telldus.turnOn('Avfuktare hobbyrum');
    telldus.sendTexts(settings.notify, "Avfuktare PÅ");
    return 'on';
  } else if (humidity < settings.threshold && settings.status === 'on') {
    log.debug(humidity + ' is not to damp');
    telldus.turnOff('Avfuktare hobbyrum');
    telldus.sendTexts(settings.notify, "Avfuktare AV");
    return 'off';
  } else {
    log.debug('Humidity unchanged');
    return settings.status;
  }
}

exports.run = run;