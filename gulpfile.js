const _ = require('lodash');
const KarmaServer = require('karma').Server;
const gulp = require('gulp');
const gutil = require('gulp-util');
const htmlhint = require('gulp-htmlhint');
const path = require('path');

const cmdArgs = require('minimist')(process.argv.slice(2));

gulp.task('eslint', () => {
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

gulp.task('htmlhint', () => {
  gulp.src('src/**/*.html')
    .pipe(htmlhint({
      'doctype-first': false,
      'tag-self-close': true
    }))
    .pipe(htmlhint.reporter('htmlhint-stylish'));
});

gulp.task('lint', ['eslint', 'htmlhint']);

function karmaStart(config, done) {
  config = _.extend({}, {
    configFile: path.join(__dirname, 'karma.conf.js'),
  }, config);

  if (cmdArgs.browsers) {
    _.extend(config, {
      browsers: cmdArgs.browsers.split(',')
    });
  }

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

gulp.task('default', ['lint', 'test']);
