const telldus = require('../telldus');

const run = async () => {
  runSovrum();
}

const runSovrum = async () => {
  let temp = await telldus.temp('vardagsrum');

  if (temp > 24) {
    console.log(temp + ' is to hot, lets cool this place down');
    //telldus.turnOn('Cooling fan sovrum');
  } else {
    console.log(temp + ' is cool enough');
    //telldus.turnOff('Cooling fan sovrum');
  }
}

exports.run = run;