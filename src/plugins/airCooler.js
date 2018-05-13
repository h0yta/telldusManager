const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  let result = await runSovrum(settings);
  return result;
}

const runSovrum = async (settings) => {
  let temp = await telldus.temp('gillestuga');

  if (temp >= settings.threshold && settings.status === 'off') {
    log.debug(temp + ' is to hot, lets cool this place down');
    //telldus.turnOn('Cooling fan sovrum');
    //telldus.sendText(settings.notify, "Kylfläkt PÅ");
    return 'on';
  } else if (temp < settings.threshold && settings.status === 'on') {
    log.debug(temp + ' is cool enough');
    //telldus.turnOff('Cooling fan sovrum');
    //telldus.sendText(settings.notify, "Kylfläkt AV");
    return 'off';
  } else {
    log.debug('Temperature unchanged');
    return settings.status;
  }
}

exports.run = run;