const querystring = require('querystring');
const api = require('./api');

/**
 * Returns a list of all sensors associated with the current user
 * @param params 
 * @returns {Promise}
 */
function list(params) {
  params = params || {};
  return api.request('/sensors/list?' + querystring.stringify(params));
}

/**
 * Returns info about a specific sensor
 * @param sensor either {id: anId} or anId   
 * @param params
 * @returns {Promise}
 */
function info(sensor, params) {
  params = params || {};
  return api.request('/sensor/info?' + querystring.stringify({ id: sensor.id || sensor }) + "&" + querystring.stringify(params));
}


/**
 * Returns sensor history
 * @param sensor either {id: anId} or anId
 * @param from timestamp in seconds
 * @param to timestamp in seconds
 * @returns {*} a Promise
 */
function history(sensor, from, to) {
  return api.request('/sensor/history?' + querystring.stringify({ id: sensor.id || sensor, from: from, to: to }));
}

module.exports.list = list;
module.exports.info = info;
module.exports.history = history;