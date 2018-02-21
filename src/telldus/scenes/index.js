const api = require('../api');

const getDevices = async () => {
  return api.Device.list();
}

const resolveScene = (scene) => {
  return {};
}

const create = async (scene) => {
  console.log('hej');
  let sceneFile = resolveScene(scene);
  let devices = await getDevices();

  await devices.device
    .filter(device => device.type === 'device')
    .filter(device => !deviceIncludedInScene(device, scene))
    .map(api.Device.turnOff);

  await devices.device
    .filter(device => device.type === 'device')
    .filter(device => deviceIncludedInScene(device, scene))
    .map(api.Device.turnOn);
}

const deviceIncludedInScene = (device, scene) => {
  return device.name.toLowerCase().indexOf('bordslampa') > -1;
}

exports.create = create;