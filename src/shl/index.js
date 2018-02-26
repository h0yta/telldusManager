const shl = require("open-shl");
const config = require('../../settings/keys.json');

const dateFormat = require('dateformat');


const options = {
    clientId: config.shlClientId,
    clientSecret: config.shlClientSecret,
    userAgent: config.shlUserAgent
}
const client = shl.connect(options);

let now = new Date();
let today = dateFormat(now, 'isoDateTime');

client.season(2017).games({ teamIds: ["HV71"] }).then(games => {
    let gamesToday = games.filter(game => {
        let startDate = dateFormat(game.start_date_time, 'isoDateTime');
        return today > startDate && !game.played;
    });

    gamesToday.forEach(game => {
        console.log(game.home_team_code + '\t' + game.home_team_result);
        console.log(game.away_team_code + '\t' + game.away_team_result);
    });
});
