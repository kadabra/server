/* eslint-disable no-console */

if (!process.env['KADABRA_ROOT']) {
  process.env['KADABRA_ROOT'] = 'DEFAULT'
}

const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('kadabra server started on http://%s:%d - visit in your browser to get started!', app.get('host'), port)
);
