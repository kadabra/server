#!/usr/bin/env node

const { spawn } = require('child_process');

process.chdir(__dirname);
process.chdir('..');

if (process.platform === 'win32') {
  nodemon = spawn('powershell', [ 'npm run start --silent' ]);
} else {
  nodemon = spawn('npm', [ 'run', 'start', '--silent' ]);
}

nodemon.stdout.on('data', function (data) {
  console.log(data.toString().trim());
});

nodemon.stderr.on('data', function (data) {
  console.log('err: ' + data.toString().trim());
});

nodemon.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString().trim());
});
