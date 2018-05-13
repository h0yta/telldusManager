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
  let runnablePlugins = settings.plugins
    .filter(plugin => now % plugin.runEvery === 0);

  await Promise.all(runnablePlugins.map(async (plugin) => {
    let exe = require('./plugins/' + plugin.name);
    plugin.status = await exe.run(plugin);
  }));

  setSettings(settings);
}

const getSettings = () => {
  let data = fs.readFileSync('./settings/manager.json', 'utf8');
  return JSON.parse(data);
}

const setSettings = (settings) => {
  fs.writeFileSync('./settings/manager.json', JSON.stringify(settings, null, 4));
}

init();