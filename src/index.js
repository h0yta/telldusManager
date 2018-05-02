const program = require('commander');
const log = require('loglevel');
const stringSimilarity = require('string-similarity');
const dateFormat = require('dateformat');
const telldus = require('./telldus');

var SunCalc = require('suncalc');

const init = function () {
  program
    .version('0.1.0')
    .option('-a --action <action>', 'on, off', 'scene', 'on')
    .option('-d --device <device>', 'Name of device', 'all')
    .option('-l --loglevel <loglevel>', 'trace | debug | info | warn | error | silent', /(auto|trace|debug|info|warn|error|silent)/, 'info')
    .parse(process.argv);

  if (!process.argv.slice(2).length || typeof program.action !== 'string') {
    program.outputHelp();
    return;
  }

  let matches = stringSimilarity.findBestMatch(program.action,
    ['on', 'off', 'scene', 'temp', 'sun', 'test']);
  if (matches.bestMatch.rating === 1) {
    setLoglevel(program.loglevel);
    run(program.action, program.device);
  } else {
    log.setLevel('info');
    log.info(' \'' + program.action + '\' is not a valid action. See --help');
    log.info(' Did you mean \t\'' + matches.bestMatch.target + '\'');
  }
}

const run = async (action, device) => {
  switch (action) {
    case 'on':
      telldus.turnOn(device);
      break;
    case 'off':
      telldus.turnOff(device);
      break;
    case 'scene':
      telldus.scene(device);
      break;
    case 'temp':
      let temp = await telldus.temp(device);
      console.log('temp: ', temp);
      break;
    case 'sun':
      sun();
      break;
    case 'test':
      test();
      break;
  }
}

const sun = () => {
  var times = SunCalc.getTimes(new Date(), 57.85, 14.11667);
  console.log('sunrise', times.sunrise);
  console.log('sunset', times.sunset);
}

const setLoglevel = function (level) {
  if (level) {
    log.setLevel(level);
  } else {
    log.setLevel('info');
  }
}

init();