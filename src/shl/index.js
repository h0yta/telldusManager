const shl = require("open-shl");
const config = require('../../settings/keys.json');
const dateFormat = require('dateformat');

const options = {
    clientId: config.shlClientId,
    clientSecret: config.shlClientSecret,
    userAgent: config.shlUserAgent
}

const run = async () => {
    let nextGame = await getNextGame('HV71');
    let game = await getGame(nextGame.game_id);

    console.log(JSON.stringify(game, null, 2));

    console.log(createGameString(game));
}

const old = async () => {
    let yesterdaysGames = await getGames('2019-10-31');
    yesterdaysGames
        .map(createGameString)
        .forEach(s => console.log(s));
}

const getGame = (myGameId) => {
    return new Promise((resolve, reject) => {
        const client = shl.connect(options);
        client.season(2019)
            .game(myGameId)
            .then(game => {
                resolve(game);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

const getNextGame = (teamCode) => {
    return new Promise((resolve, reject) => {
        const client = shl.connect(options);
        client.season(2019)
            .games({ teamIds: [teamCode] })
            .then(games => {
                let unplayedGames = games.filter(game => {
                    return !game.played;
                });

                let nextGame = unplayedGames[unplayedGames.length - 1];
                resolve(nextGame);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

const getGames = (day) => {
    return new Promise((resolve, reject) => {
        const client = shl.connect(options);

        client.season(2019)
            .games()
            .then(games => {
                let gamesOnGivenDay = games.filter(game => {
                    let gameDay = dateFormat(game.start_date_time, 'yyyy-mm-dd');
                    return day === gameDay;;
                });

                resolve(gamesOnGivenDay);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

const createGameString = (game) => {
    return game.home_team_code.padStart(4) + ' - ' + game.away_team_code.padEnd(4);
}

const createScoreString = (game) => {
    return game.home_team_code.padStart(4) + ' - ' + game.away_team_code.padEnd(4) + '  '
        + game.home_team_result + ' - ' + game.away_team_result;
}

const createLiveString = (game) => {
    if (game.live) {
        return game.live.home_team_code.padStart(4) + ' - ' + game.live.away_team_code.padEnd(4) + '  '
            + game.live.home_team_result + ' - ' + game.live.away_team_result;
    } else {
        return game.home_team_code.padStart(4) + ' - ' + game.away_team_code.padEnd(4) + '  '
            + game.home_team_result + ' - ' + game.away_team_result;
    }
}


exports.getGame = getGame;
exports.getNextGame = getNextGame;
exports.createGameString = createGameString;
exports.createScoreString = createScoreString;
exports.createLiveString = createLiveString;