#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');
const KarmaServer = require('karma').Server;

const compiler = webpack(require('./webpack-test-fast.config'));

let karmaStarted = false;

const watcher = compiler.watch({
  aggregateTimeout: 300
}, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(stats.toString({
    chunks: false,
    colors: true
  }));

  if (!karmaStarted) {
    const server = new KarmaServer({
      configFile: path.join(__dirname, 'karma-fast.config.js')
    });
    server.start();

    karmaStarted = true;
  }
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    watcher.close();
  });
});
