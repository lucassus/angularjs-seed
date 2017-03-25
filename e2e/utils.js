const { browser } = require('protractor');
const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

const ARTIFACTS_DIR = path.join(__dirname, '..', 'artifacts', 'e2e');

function makeArtifactFilePath(name, extension) {
  fs.mkdirsSync(ARTIFACTS_DIR);
  const fileName = [name.replace(/[^a-z0-9]/gi, '_'), extension].join('.');

  return path.join(ARTIFACTS_DIR, fileName);
}

module.exports = {
  cleanupArtifacts() {
    fs.removeSync(ARTIFACTS_DIR);
  },

  takeScreenshot(testTitle = 'screenshot') {
    browser.takeScreenshot().then((data) => {
      const filePath = makeArtifactFilePath(testTitle, 'png');
      const stream = fs.createWriteStream(filePath);

      stream.write(new Buffer(data, 'base64'));
      stream.end();
    });
  },

  writeBrowserLog(testTitle, browserLog) {
    const messages = _.map(browserLog, 'message');
    if (messages.length === 0) {
      return;
    }

    const data = messages.join('\n\n');

    const filePath = makeArtifactFilePath(testTitle, 'txt');
    fs.writeFileSync(filePath, data);
  }
};
