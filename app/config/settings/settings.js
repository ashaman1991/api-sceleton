/* eslint-disable import/no-dynamic-require, global-require */
const os = require('os');
const routes = require('./routes.config');
const _ = require('lodash');

const configLocation = './config.main';

function createArgumentSettings(settings) {
  settings.environment = process.env.NODE_ENV || 'dev';
  settings.hostName = '127.0.0.1'; // is this needed?
  settings.port = 3000; // TODO: get this value from somewhere
  return settings;
}

function loadEnvironmentConfigFile(settings) {
  let config;

  const envConfigLocation = `./env/${settings.environment}`;
  try {
    config = require(envConfigLocation);
  } catch (e) {
    console.error(`Unable to parse "config/settings/" ${envConfigLocation} ${e}`);
    config = {};
  }

  return config;
}

function loadConfigSettings(settings) {
  const envConfig = loadEnvironmentConfigFile(settings);
  const mainConfig = require(configLocation);
  settings = _.merge({}, settings, mainConfig, envConfig);
  return settings;
}

function loadServerSettings(settings) {
  settings.serverName = os.hostname().toLowerCase();
  settings.serverCores = os.cpus().length;
  return settings;
}

function loadRouteSettings(settings) {
  settings.routes = routes;
  return settings;
}

function initializeSettings() {
  let settings = {};
  settings = createArgumentSettings(settings);
  settings = loadConfigSettings(settings);
  settings = loadServerSettings(settings);
  settings = loadRouteSettings(settings);
  global.settings = settings;
  return settings;
}

const config = initializeSettings();

module.exports = config;
