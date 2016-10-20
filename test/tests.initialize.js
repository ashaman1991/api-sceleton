process.env.NODE_ENV = 'test';
const settingsConfig = require('../app/config/settings/settings');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const helpers = require('./helpers');
const server = require('../app/config/server.js');
const assert = require('chai').assert;
const sinon = require('sinon');

const application = express();

/**
 * Drop test DB before tests start
 */
function dropMongo(config) {
  return MongoClient.connect(config.mongo.url)
    .then((db) => {
      return db.dropDatabase()
        .then(() => {
          db.close();
        });
    });
}

/**
 * Start server instance for testing
 * Expose some tools to global
 */
before(() => {
  global.assert = assert;
  global.sinon = sinon;

  return dropMongo(settings).then(() => {
    return server.start(application, settingsConfig);
  })
    .then((app) => {
      global.request = helpers.request;
      global.application = app;
      return helpers.db.populateDb();
    });
});
