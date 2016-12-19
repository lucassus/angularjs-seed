#!/usr/bin/env node

const fs = require('fs');
const rimraf = require('rimraf');

rimraf.sync('./client/build-test');

const spawn = require('child_process').spawn;

function spawnWebpack() {
  return spawn('./node_modules/webpack/bin/webpack.js',
    ['--config', 'client/webpack-test-fast.config.js', '--watch'],
    { stdio: 'inherit' });
}

function spawnKarma() {
  return spawn('./node_modules/karma/bin/karma',
    ['start', 'client/karma-fast.config.js'],
    { stdio: 'inherit' });
}

function webpackReady() {
  return fs.existsSync('./client/build-test/vendor.js')
    && fs.existsSync('./client/build-test/specs.js');
}

const children = [];
process.stdout.write('Starting webpack');
children.push(spawnWebpack());

const timeout = setInterval(() => {
  if (webpackReady()) {
    clearInterval(timeout);

    process.stdout.write('\n');
    process.stdout.write('Starting karma...\n');

    children.push(spawnKarma());
  } else {
    process.stdout.write('.');
  }
}, 500);

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    clearInterval(timeout);

    children.forEach((child) => {
      child.kill(signal);
    });
  });
});
