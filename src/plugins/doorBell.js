const telldus = require('../telldus');
const log = require('loglevel');

const run = async (settings) => {
  console.log('run');
  let last = await telldus.lastAction(settings.device, settings.timeframe);
  
  let now = parseInt(new Date().getTime() / 1000);
  let elapsedTime = parseInt(now - last.ts);
  let maxDelay = settings.delay + (settings.runEvery * 60);

  console.log('elapsedTime', elapsedTime, 'delay', settings.delay, 'maxDelay', maxDelay);

  if (last.state === 1 &&  elapsedTime > settings.delay && elapsedTime <= maxDelay) {
    console.log('turn off', settings.device);
    await telldus.turnOff(settings.device);
    settings.actionDevices.forEach(device => {
      console.log('turn off', device);
      telldus.turnOff(device);
    });
  } else {
    console.log('state', last.state)
  }
}

exports.run = run;