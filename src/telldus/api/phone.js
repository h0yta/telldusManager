const querystring = require('querystring');
const api = require('./api');

/**
 * Returns a list of all phones associated with the current user
 * @param params 
 * @returns {Promise}
 */
function list(params) {
  params = params || {};
  return api.request('/user/listPhones?' + querystring.stringify(params));
}

/**
 * Turns a device off
 * @param device either {id: anId} or anId
 * @returns {*} a Promise
 */
function sendPushText(phone, text) {
  return api.request('/user/sendPushTest?' + querystring.stringify({
    phoneId: phone.id || phone,
    message: text
  }));
}

module.exports.list = list;
module.exports.sendPushText = sendPushText;