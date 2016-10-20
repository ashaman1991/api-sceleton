const settingsConfig = require('./app/config/settings/settings');
const express = require('express');
const server = require('./app/config/server.js');

const application = express();

server.start(application, settingsConfig).catch(console.error);
