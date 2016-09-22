const Promise = require('bluebird');
const request = require('request');

const { config: { baseUrl } } = require('../protractor.config');

function seedDatabase() {
  const post = Promise.promisify(request.post);
  return post(`${baseUrl}/api/!seed`);
}

beforeEach((done) => {
  seedDatabase().then(done);
});
