const _ = require('lodash');
const KarmaServer = require('karma').Server;
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const webpack = require('webpack');

gulp.task('clean', () => {
  return del('public/assets/**/*');
});

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');
  const friendlyFormatter = require('eslint-friendly-formatter');

  return gulp.src([
    '*.js',
    'server/**/*.js',
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

const webpackConfig = require('./webpack.config.js');

function runCompiler(compiler, done) {
  compiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      chunks: false,
      colors: true
    }));
    done();
  });
}

gulp.task('webpack:build', (done) => {
  const devCompiler = webpack(webpackConfig);
  runCompiler(devCompiler, done);
});

gulp.task('webpack:build-production', (done) => {
  const config = Object.create(webpackConfig);

  config.plugins = config.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  const prodCompiler = webpack(config);
  runCompiler(prodCompiler, done);
});

gulp.task('build', ['clean', 'webpack:build']);
gulp.task('build-production', ['clean', 'webpack:build-production']);

gulp.task('default', ['build']);
