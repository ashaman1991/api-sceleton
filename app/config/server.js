const bodyParser = require('body-parser');
const unless = require('express-unless');
const passport = require('./passport');
const routeConfig = require('./routes');
const mongoose = require('mongoose');
const ejwt = require('express-jwt');
const winston = require('winston');
const errors = require('./error');
const path = require('path');
const http = require('http');
const _ = require('lodash');
const fs = require('fs');
/**
 * Custom server responses
 */
const responses = require('../responses');

function configureLogger(config) {
  const logger = new winston.Logger(config);
  global.log = logger;
}

function injectResponses(req, res, next) {
  Object.keys(responses).forEach((key) => {
    res[key] = responses[key];
  });
  next();
}

function getToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

/**
 * Cover routes with JWT auth
 */
function configureJwtAuth(config) {
  return ejwt({
    secret: config.jwtSecret,
    credentialsRequired: true,
    userProperty: 'jwtPayload',
    getToken
  })
    .unless({ path: ['/v1/signin', '/v1/signup'] });
}

function requireAuth() {
  const middleware = (req, res, next) => {
    const id = req.jwtPayload.id;
    if (id) {
      return User
        .findOne({ _id: id })
        .then((user) => {
          if (!user) return res.status(401).send();
          req.user = user;
          return next();
        });
    }
    return res.status(401).send();
  };
  middleware.unless = unless;
  return middleware;
}

function requestLogger(req, res, next) {
  log.debug('Request:', {
    method: req.method,
    url: req.path,
    data: { body: req.body, query: req.query },
    status: res.statusCode,
    isRequest: true
  });
  next();
}

/**
 * Add and configure Express middleware
 */
function configureMiddleware(application, config) {
  application.use(bodyParser.json());
  application.use(injectResponses);
  application.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.type('application/json');
    next();
  });
  application.use(passport);
  application.use(requestLogger);
  application.use(configureJwtAuth(config));
  application.use(requireAuth().unless({ path: ['/v1/signin', '/v1/signup'] }));
  routeConfig.registerRoutes(application, config.routes);
  application.use(errors.handler);
}

/**
 * Configure Mongoose and expose models to global
 */
function configureDb(settings) {
  mongoose.Promise = global.Promise;

  return new Promise((resolve, reject) => {
    mongoose.connect(settings.url);
    const db = mongoose.connection;
    db.on('error', reject);
    db.once('open', () => {
      const modelPath = path.join(__dirname, settings.modelPath);
      const models = fs.readdirSync(modelPath);
      models.forEach((modelFile) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const model = require(path.join(modelPath, modelFile));
        log.info(`Register model: ${model.modelName}`);
        global[model.modelName] = model;
      });
      resolve(db);
    });
  });
}

function startServer(application, config) {
  const server = http.createServer(application);
  server.listen(config.port, config.hostName, config.queueLength, () => {
    log.info('listening at http://%s:%s', config.hostName, config.port);
  });
}

/**
 * Configure setver instance
 */
function configureWorker(application, config) {
  // configure logging
  configureLogger(config.logger);
  // configure database connection
  return configureDb(config.mongo)
    .then(() => {
      // configure server
      configureMiddleware(application, config);
      // configure routes
      global._ = _;
      global.ApiError = errors.ApiError;
      startServer(application, config);
      return application;
    });
}

module.exports = {
  start: configureWorker
};
