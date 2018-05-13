const telldus = require('../telldus');

const run = async () => {
  runHobbyrum();
}

const runHobbyrum = async () => {
  let humidity = await telldus.humidity('hobbyrum');

  if (humidity > 45) {
    console.log(humidity + ' is to wet, lets dry this place out');
    telldus.turnOn('Avfuktare hobbyrum');
  } else {
    console.log(humidity + ' is dry enough');
    telldus.turnOff('Avfuktare hobbyrum');
  }
}

exports.run = run;