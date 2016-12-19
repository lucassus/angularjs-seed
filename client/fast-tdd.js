#!/usr/bin/env node

const fs = require('fs');
const rimraf = require('rimraf');
const webpack = require('webpack');

rimraf.sync('./client/build-test');

const spawn = require('child_process').spawn;

const children = [];
const compiler = webpack(require('./webpack-test-fast.config'));

process.stdout.write('Starting webpack');
const timeout = setInterval(() => {
  process.stdout.write('.');
}, 500);

const watcher = compiler.watch({
  aggregateTimeout: 300
}, function(err, stats) {
  if (err) {
    console.error(err);
    return;
  }

  clearInterval(timeout);

  process.stdout.write('\n');
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));

  // TODO use karma api
  children.push(spawn('./node_modules/karma/bin/karma',
    ['start', 'client/karma-fast.config.js'],
    { stdio: 'inherit' }));
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    watcher.close();

    children.forEach((child) => {
      child.kill(signal);
    });
  });
});
