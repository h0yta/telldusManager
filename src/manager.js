const dateFormat = require('dateformat');
const log = require('loglevel');

const airCooler = require('./plugins/airCooler');
const airDryer = require('./plugins/airDryer');

const init = async function () {
  log.setLevel('info');
  let now = dateFormat(new Date(), "MM");
  if (now % 30 === 0) {
    await everyThirtyMinute();
  }

  if (now % 15 === 0) {
    await everyFifteenMinute();
  }

  if (now % 5 === 0) {
    await everyFiveMinute();
  }

  if (now % 1 === 0) {
    await everyMinute();
  }
}

const everyMinute = async () => {

}

const everyFiveMinute = async () => {

}

const everyFifteenMinute = async () => {
  await airCooler.run();
  await airDryer.run();
}

const everyThirtyMinute = async () => {

}

init();