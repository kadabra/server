#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const shell = require("shelljs");
const opn = require('opn');

const path = require('path');
const fs = require('fs');

// Clear console
clear()

// Print out "Kadabra"
console.log(
  chalk.magenta(
    figlet.textSync("Kadabra", {
      font: "Alligator2",
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  )
);
console.log();

// Record original path then cd
const initpath = process.cwd()
process.chdir(__dirname);
process.chdir('..');
const globalpath = process.cwd()

// Set environment variable
if (process.argv.some(arg => ['--global', '-global', '-G'].includes(arg))) {
  process.env['KADABRA_ROOT'] = 'DEFAULT'
  process.env['KADABRA_FOLDER'] = path.join(globalpath, '.kadabra')
  console.log('Running in your global node_modules folder')
} else {
  process.env['KADABRA_ROOT'] = initpath
  process.env['KADABRA_FOLDER'] = path.join(initpath, '.kadabra')
  console.log('Using directory: ' + process.env['KADABRA_ROOT'])
}

// Create .kadabra folder if it doesn't exist
if (!fs.existsSync(process.env['KADABRA_FOLDER'])){
  fs.mkdirSync(process.env['KADABRA_FOLDER']);
}

process.env['KADABRA_SERVICES'] = path.join(process.env['KADABRA_FOLDER'], 'services.json')
// Creates services.json if it doesn't exist
fs.writeFile(process.env['KADABRA_SERVICES'], '{}', { flag: 'wx' }, e=>e);

// Craft command
const nodemon = path.join(globalpath, 'node_modules', '.bin', 'kadabra-nodemon')
let command = nodemon + ' -w ' + process.env['KADABRA_FOLDER'] + ' /src '

// Execute
shell.exec(command, function(code, stdout, stderr) {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);
});

// Open in browser after 1 sec delay
if (process.argv.some(arg => ['--open', '-open', '-O'].includes(arg))) {
  setTimeout(() => {
    opn('http://localhost:7777')
  }, 1000);
}
