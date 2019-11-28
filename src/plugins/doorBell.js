const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  let lastDevice = await telldus.lastAction(settings.device, settings.timeframe);
  let lastActionDevice = await telldus.lastAction(settings.actionDevice, settings.timeframe);

  let now = parseInt(new Date().getTime() / 1000);
  let elapsedDeviceTime = parseInt(now - lastDevice.ts);
  let elapsedActionDeviceTime = parseInt(now - lastActionDevice.ts);

  let diff = elapsedDeviceTime - elapsedActionDeviceTime;
  diff = diff < 0 ? (diff * -1) : diff;

  if (lastDevice.state === 1 && elapsedDeviceTime > settings.delay && diff < 5) {
    await telldus.turnOff(settings.device);

    telldus.turnOff(settings.actionDevice);

  }
}

exports.run = run;