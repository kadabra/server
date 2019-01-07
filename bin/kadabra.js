#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const shell = require("shelljs");
const opn = require('opn');
const randomWords = require('random-words');

const path = require('path');
const fs = require('fs');

// Address args
function getMagicWord(args) {
  const allArgs = [
    '--global', '-global', '-G', 
    '--open', '-open', '-O'
  ]
  for (arg of args) {
    // return first unknown arg
    if (! allArgs.includes(arg)) return arg
  }
  // else generate a random magic word
  return randomWords({exactly: 1})
}
const config = {
  runGlobally: process.argv.some(arg => ['--global', '-global', '-G'].includes(arg)),
  open: process.argv.some(arg => ['--open', '-open', '-O'].includes(arg)),
}
process.env['MAGIC_WORD'] = getMagicWord(process.argv.slice(2))

// Clear console
clear()

// Print out "Kadabra"
console.log(
  chalk.magenta(
    figlet.textSync("Kadabra", {
      font: "Contessa",
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  )
);
console.log();
console.log('The magic word is: ' + process.env['MAGIC_WORD'])

// Record original path then cd
const initpath = process.cwd()
process.chdir(__dirname);
process.chdir('..');
const globalpath = process.cwd()

// Set environment variable
if (config.runGlobally) {
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
if (config.open) {
  setTimeout(() => {
    opn('http://localhost:7777')
  }, 1000);
}
