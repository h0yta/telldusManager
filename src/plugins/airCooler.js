const telldus = require('../telldus');
const dateFormat = require('dateformat');
const log = require('loglevel');

const run = async (settings) => {
  let temp = await telldus.temp(settings.sensorDevice);

  if (settings.workingHours) {
    let now = dateFormat(new Date(), "HH:MM");
    let start = dateFormat(new Date().setHours(
      settings.workingHours.start.split(':')[0],
      settings.workingHours.start.split(':')[1]), 'HH:MM');
    let stop = dateFormat(new Date().setHours(
      settings.workingHours.stop.split(':')[0],
      settings.workingHours.stop.split(':')[1]), 'HH:MM');

    if (now < start || now > stop) {
      log.debug('Outside working hours');
      if (settings.status === 'on') {
        telldus.turnOff(settings.device);
        telldus.sendTexts(settings.notify, settings.device + " AV");
      }
      return 'off';
    }
  }

  if (temp > settings.threshold && settings.status === 'off') {
    log.debug(temp + ' is to hot, lets cool this place down');
    telldus.turnOn(settings.device);
    telldus.sendTexts(settings.notify, settings.device + " PÅ");
    return 'on';
  } else if (temp < settings.threshold && settings.status === 'on') {
    log.debug(temp + ' is cool enough');
    telldus.turnOff(settings.device);
    telldus.sendTexts(settings.notify, settings.device + " AV");
    return 'off';
  } else {
    log.debug('Temperature still ' + temp);
    return settings.status;
  }
}

exports.run = run;