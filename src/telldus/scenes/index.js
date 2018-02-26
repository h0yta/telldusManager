const api = require('../api');
const scenes = require('../../../settings/scenes.json');

const getDevices = async () => {
  return api.Device.list();
}

const resolveScene = (scene) => {
  let keys = Object.keys(scenes)
    .filter(key => key.toLowerCase() === scene.toLowerCase());

  if (keys.length === 1) {
    return scenes[keys[0]];
  } else {
    throw 'Unknown scene';
  }
}

const create = async (scene) => {
  try {
    let sceneFile = resolveScene(scene);
    let devices = await getDevices();

    await devices.device
      .filter(device => device.type === 'device')
      .map(device => addAction(device, sceneFile))
      .filter(device => device.action !== undefined)
      .map(turnOnOff);
  } catch (e) {
    console.log('Error', e);
  }
}

const addAction = (device, scene) => {
  let keys = Object.keys(scene)
    .filter(key => key.toLowerCase() === device.name.toLowerCase());

  if (keys.length === 1) {
    device.action = scene[keys[0]];
  }

  return device;
}

const turnOnOff = (device) => {
  if (device.action.toUpperCase() === 'ON') {
    console.log('Turn ON:', device.name);
    api.Device.turnOn(device);
  } else if (device.action.toUpperCase() === 'OFF') {
    console.log('Turn OFF:', device.name);
    api.Device.turnOff(device);
  }
}

exports.create = create;