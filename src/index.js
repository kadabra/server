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

server.on('listening', () => {
  console.log('Server (re)started on http://%s:%d', app.get('host'), port)
  console.log()
});
