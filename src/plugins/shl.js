const telldus = require('../telldus');
const shl = require("../shl");
const log = require('loglevel');

const run = async (settings) => {
  if (settings.state) {
    let now = new Date().getTime();
    let start = new Date(settings.state.start_date_time).getTime();

    if (start <= now) {
      let currGame = await shl.getGame(settings.state.game_id);

      if (currGame.played) {
        let changedObject = createEvent(false, shl.createScoreString(currGame) + ' - SLUT');
        await telldus.sendTexts(settings.notify, changedObject.text);
        return null;
      }

      let event = createGameEvent(settings.state, currGame);
      if (event.changed) {
        log.debug(event.text);
        await telldus.sendTexts(settings.notify, event.text);
        await turnLightOnOff(settings.device, currGame.live);
      }

      return currGame;
    } else {
      log.debug('Game not started yet');
      return settings.state;
    }
  } else {
    let nextGame = await shl.getNextGame(settings.team);
    log.debug('Fetched next game -> ' + shl.createGameString(settings.state));
    return nextGame;
  }
}

const createGameEvent = (oldGame, currGame) => {
  if (!isLive(oldGame) && !isLive(currGame)) {
    let eventText = shl.createGameString(currGame) + ' Game starts soon';
    return createEvent(false, eventText);
  } else if (!isLive(oldGame) && isLive(currGame)) {
    let eventText = shl.createGameString(currGame) + ' Game started';
    return createEvent(true, eventText);
  } else if (oldGame.live && currGame.live) {
    return createLiveEvent(oldGame, currGame);
  }

  return createEvent(false, null);
}

const createLiveEvent = (oldGame, currGame) => {
  if (oldGame.live.away_score != currGame.live.away_score || oldGame.live.away_score != currGame.live.away_score) {
    let eventText = shl.createLiveString(currGame);
    return createEvent(true, eventText);
  }

  return createEvent(false, null);
}

const createEvent = (changed, text) => {
  return {
    changed, changed,
    text: text
  }
}

const isLive = (game) => {
  return game.live != undefined && game.live.game_id != undefined;
}

exports.run = run;

const calculateLightScore = (game) => {
  if (game.home_score === game.away_score) {
    return 3;
  } if (game.home_score > game.away_score) {
    return 1;
  } else {
    return 2;
  }
}

const turnLightOnOff = async (device, game) => {
  let times = calculateLightScore(game);
  log.debug('Light up ', times, ' times');

  for (let time = 0; time < times; time++) {
    await sleep(2000);
    await telldus.turnOn(device);
    await sleep(4000);
    await telldus.turnOff(device);
  }
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
