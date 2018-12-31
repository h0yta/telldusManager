const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  let last = await telldus.lastAction(settings.device, settings.timeframe);

  let now = parseInt(new Date().getTime() / 1000);
  let elapsedTime = parseInt(now - last.ts);
  let maxDelay = settings.delay + (settings.runEvery * 60);

  if (last.state === 1 && elapsedTime > settings.delay && elapsedTime <= maxDelay) {
    await telldus.turnOff(settings.device);
    telldus.sendTexts(settings.notify, 'Dörrklocka återställd');
    settings.actionDevices.forEach(device => {
      telldus.turnOff(device);
    });
  }
}

exports.run = run;