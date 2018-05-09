const dateFormat = require('dateformat');
const log = require('loglevel');

const airCooler = require('./airCooler/airCooler');

const init = async function () {
  log.setLevel('debug');
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
  await airCooler.run();
}

const everyMinute = async () => {
  log.debug(' run everyMinute');
}

const everyFiveMinute = async () => {
  log.debug(' run everyFiveMinute');
}

const everyFifteenMinute = async () => {
  log.debug(' run everyFifteenMinute');
}

const everyThirtyMinute = async () => {
  log.debug(' run everyThirtyMinute');
}

init();