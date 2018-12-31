const querystring = require('querystring');
const api = require('./api');

/**
 * Returns a list of all devices associated with the current user
 * @param params 
 * @returns {Promise}
 */
function list(params) {
  params = params || {};
  return api.request('/devices/list?' + querystring.stringify(params));
}

/**
 * Returns info about a specific device
 * @param device either {id: anId} or anId   
 * @param params
 * @returns {Promise}
 */
function info(device, params) {
  params = params || {};
  return api.request('/device/info?' + querystring.stringify({ id: device.id || device }) + "&" + querystring.stringify(params));
}

/**
 * Dims a device.
 * @param device either {id: anId} or anId
 * @param level the level the device should dim to. A value between 0-255
 * @returns {*} a Promise
 */
function dim(device, level) {
  return api.request('/device/dim?' + querystring.stringify({ id: device.id || device, level: level }));
}

/**
 * Turns a device off
 * @param device either {id: anId} or anId
 * @returns {*} a Promise
 */
function turnOn(device) {
  return api.request('/device/turnOn?' + querystring.stringify({ id: device.id || device }));
}

/**
 * Turns a device on
 * @param device either {id: anId} or anId
 * @returns {*} a Promise
 */
function turnOff(device) {
  return api.request('/device/turnOff?' + querystring.stringify({ id: device.id || device }));
}

/**
 * Returns device history
 * @param device either {id: anId} or anId
 * @param from timestamp in seconds
 * @param to timestamp in seconds
 * @returns {*} a Promise
 */
function history(device, from, to) {
  return api.request('/device/history?' + querystring.stringify({ id: device.id || device, from: from, to: to, lastFirst: true }));
}

module.exports.list = list;
module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;
module.exports.history = history;