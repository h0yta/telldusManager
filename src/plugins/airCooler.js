const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  let temp = await telldus.temp(settings.sensorDevice);

  if (temp > settings.threshold && settings.status === 'off') {
    log.debug(temp + ' is to hot, lets cool this place down');
    //telldus.turnOn(settings.device);
    //telldus.sendText(settings.notify, settings.device + " PÅ");
    return 'on';
  } else if (temp < settings.threshold && settings.status === 'on') {
    log.debug(temp + ' is cool enough');
    //telldus.turnOff(settings.device);
    //telldus.sendText(settings.notify, settings.device + " AV");
    return 'off';
  } else {
    log.debug('Temperature still ' + temp);
    return settings.status;
  }
}

exports.run = run;