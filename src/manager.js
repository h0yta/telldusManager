const dateFormat = require('dateformat');
const log = require('loglevel');
var fs = require('fs');

const airCooler = require('./plugins/airCooler');
const airDryer = require('./plugins/airDryer');

const init = async function () {
  let settings = getSettings();
  log.setLevel(settings.logLevel);
  log.debug('LogLevel set to -> ', settings.logLevel);

  let now = dateFormat(new Date(), "MM");

  if (now % 30 === 0) {
    await everyThirtyMinute(settings);
  }

  if (now % 15 === 0) {
    await everyFifteenMinute(settings);
  }

  if (now % 5 === 0) {
    await everyFiveMinute(settings);
  }

  if (now % 1 === 0) {
    await everyMinute(settings);
  }

  setSettings(settings);
}

const everyMinute = async (settings) => {
}

const everyFiveMinute = async (settings) => {
}

const everyFifteenMinute = async (settings) => {
  settings.airCooler.status = await airCooler.run(settings.airCooler);
  settings.airDryer.status = await airDryer.run(settings.airDryer);
}

const everyThirtyMinute = async (settings) => {
}

const getSettings = () => {
  let data = fs.readFileSync('./settings/manager.json', 'utf8');
  return JSON.parse(data);
}

const setSettings = (settings) => {
  fs.writeFileSync('./settings/manager.json', JSON.stringify(settings, null, 4));
}

init();