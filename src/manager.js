const dateFormat = require('dateformat');
const log = require('loglevel');
var fs = require('fs');

const init = async function () {
  let managerJson = getManagerJson();
  log.setLevel(managerJson.logLevel);
  log.debug('LogLevel set to -> ', managerJson.logLevel);

  let now = dateFormat(new Date(), "MM");
  let runnablePlugins = managerJson.plugins
    .filter(plugin => now % plugin.runEvery === 0);

  await Promise.all(runnablePlugins.map(async (plugin) => {
    let exe = require('./plugins/' + plugin.name);
    plugin.state = await exe.run(plugin);
  }));

  updateManagerJson(managerJson);
}

const getManagerJson = () => {
  let data = fs.readFileSync(__dirname + '/../settings/manager.json', 'utf8');
  return JSON.parse(data);
}

const updateManagerJson = (settings) => {
  fs.writeFileSync(__dirname + '/../settings/manager.json', JSON.stringify(settings, null, 4));
}

init();