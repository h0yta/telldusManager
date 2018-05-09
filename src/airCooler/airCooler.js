const telldus = require('../telldus');

const run = async () => {
  runSovrum();
}

const runSovrum = async () => {
  let temp = await telldus.temp('vardagsrum');

  if (temp > 29) {
    console.log('Lets cool this place down');
    telldus.turnOn('Läslampa vardagsrum');
  } else {
    console.log('It is cool');
    telldus.turnOff('Läslampa vardagsrum');
  }
}

exports.run = run;