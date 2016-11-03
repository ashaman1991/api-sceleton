const winston = require('winston');
const moment = require('moment');
const chalk = require('chalk');

const consoleTransport = {
  colorize: true,
  align: true,
  prettyPrint: true,
  timestamp() {
    return Date.now();
  },
  formatter(options) {
    const prefix = `${chalk.yellow(moment().format('MM-DD-YYYY hh:mm:ss'))} ${winston.config.colorize(options.level, options.level.toUpperCase())}: ${(options.message ? options.message : '')} `;
    let message = `${(options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '')}`;
    if (options.meta.isRequest) {
      message = `${options.meta.status} ${_.padEnd(options.meta.method, 6)} ${_.padEnd(chalk.green(options.meta.url), 50)} Params: ${JSON.stringify(options.meta.data)}`;
    }
    return `${prefix} ${message}`;
  }
};

module.exports = {
  level: 'verbose',
  transports: [
    new (winston.transports.Console)(consoleTransport)
  ]
};
