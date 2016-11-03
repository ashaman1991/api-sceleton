const path = require('path');

function loadController(routeItem) {
  let controller;

  if (!routeItem || !routeItem.controller) {
    throw new Error('Undefined "controller" property in "/config/routes.config.json"');
  }
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    controller = require(path.join(__dirname, routeItem.controller));
  } catch (e) {
    throw new Error(`Unable to load ${routeItem.controller}: ${e}`);
  }

  return controller;
}

function getRoute(routeItem) {
  if (!routeItem || !routeItem.route || routeItem.route.length === 0) {
    throw new Error('Undefined or empty "route" property in "/config/routes.config.json"');
  }

  return routeItem.route;
}

function getMethod(routeItem) {
  if (!routeItem || !routeItem.method || routeItem.method.length === 0) {
    throw new Error('Undefined or empty "method" property in "/config/routes.config.json"');
  }

  const method = routeItem.method.toLowerCase();

  switch (method) {
    case 'get':
    case 'put':
    case 'post':
    case 'delete':
      return method;
    default:
      throw new Error(`Invalid REST "method" property in "/config/routes.config.json": ${method}`);
  }
}

function getAction(routeItem) {
  if (!routeItem || !routeItem.action || routeItem.action.length === 0) {
    return getMethod(routeItem);
  }
  return routeItem.action;
}


function registerRoute(application, controller, route, method, action) {
  log.verbose(`Register route: ${method} ${route}`);
  application.route(route)[method]((req, res, next) => {
    controller[action](req, res, next);
  });
}

function registerRoutes(application, config) {
  log.info('Binding routes...');
  for (let i = 0, length = config.length; i < length; i++) {
    const routeItem = config[i];
    const controller = loadController(routeItem);
    const route = getRoute(routeItem);
    const method = getMethod(routeItem);
    const action = getAction(routeItem);

    registerRoute(application, controller, route, method, action);
  }
}

module.exports = { registerRoutes };
