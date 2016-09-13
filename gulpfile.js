const _ = require('lodash');
const KarmaServer = require('karma').Server;
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');
  const friendlyFormatter = require('eslint-friendly-formatter');

  return gulp.src([
    '*.js',
    'src/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.failAfterError());
});

function karmaStart(config, done) {
  config = _.extend({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false
  }, config);

  const server = new KarmaServer(config);

  if (config.singleRun) {
    // TDD never ends

    server.on('run_complete', (browsers, results) => {
      const { failed } = results;

      if (failed > 0) {
        const message = failed > 1 ? 'Tests' : 'Test';

        done(new gutil.PluginError('karma', {
          message: [failed, message, 'failed'].join(' ')
        }));
      } else {
        done();
      }
    });
  }

  server.start();
}

gulp.task('test', (done) => {
  karmaStart({ singleRun: true }, done);
});

gulp.task('tdd', (done) => {
  karmaStart({ singleRun: false }, done);
});

gulp.task('webpack:build', (done) => {
  const config = require('./webpack.config.js');

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
    done();
  });
});

gulp.task('default', ['webpack:build']);
