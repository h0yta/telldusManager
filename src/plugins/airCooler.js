const telldus = require('../telldus');
const settings = require('../../settings/manager.json');

const run = async (settings) => {
  let result = await runSovrum(settings);
  return result;
}

const runSovrum = async (settings) => {
  let temp = await telldus.temp('gillestuga');

  if (temp >= settings.threshold && settings.status === 'off') {
    console.log(temp + ' is to hot, lets cool this place down');
    //telldus.turnOn('Cooling fan sovrum');
    //telldus.sendText("oscar", "Kylfläkt PÅ");
    return 'on';
  } else if (temp < settings.threshold && settings.status === 'on') {
    console.log(temp + ' is cool enough');
    //telldus.turnOff('Cooling fan sovrum');
    //telldus.sendText("oscar", "Kylfläkt AV");
    return 'off';
  } else {
    console.log('Temperature unchanged');
    return settings.status;
  }
}

exports.run = run;