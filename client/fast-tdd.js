#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const webpack = require('webpack');
const KarmaServer = require('karma').Server;

rimraf.sync('./client/build-test');

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

  const config = _.extend({}, {
    configFile: path.join(__dirname, 'karma-fast.config.js')
  }, { singleRun: false });
  const server = new KarmaServer(config);
  server.start();
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    watcher.close();
  });
});
