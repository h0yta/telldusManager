const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  let humidity = await telldus.humidity(settings.sensorDevice);

  if (humidity >= settings.threshold && settings.status === 'off') {
    log.debug(humidity + ' is to damp, lets dehumidify this place');
    telldus.turnOn(settings.device);
    telldus.sendTexts(settings.notify, settings.device + " PÅ");
    return 'on';
  } else if (humidity < settings.threshold && settings.status === 'on') {
    log.debug(humidity + ' is not to damp');
    telldus.turnOff(settings.device);
    telldus.sendTexts(settings.notify, settings.device + " AV");
    return 'off';
  } else {
    log.debug('Humidity still ' + humidity);
    return settings.status;
  }
}

exports.run = run;