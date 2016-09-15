const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');

const cwd = path.join(__dirname, '.');
const exec = Promise.promisify(require('child_process').exec);

function inspectRepository() {
  function revParse(args) {
    return exec(`git rev-parse ${args}`, { cwd })
      .then((result) => result.trim());
  }

  return Promise.all([
    revParse('--abbrev-ref HEAD'),
    revParse('HEAD')
  ]).spread((branch, commit) => {
    return { branch, commit };
  }).catch(() => {
    return {
      branch: '?',
      commit: '?'
    };
  });
}

module.exports = function(source) {
  const callback = this.async();

  inspectRepository().then(({ branch, commit }) => {
    const compiled = _.template(source);

    const signature = compiled({
      timestamp: new Date().toISOString(),
      branch,
      commit
    });

    callback(null, `module.exports = ${JSON.stringify(signature)}`);
  });
};
