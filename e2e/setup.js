const Promise = require('bluebird');
const request = require('request');

const { config: { baseUrl } } = require('../config/protractor.config');

function seedDatabase() {
  const post = Promise.promisify(request.post);
  return post(`${baseUrl}/api/seed`);
}

/* eslint-disable jasmine/no-global-setup */
beforeEach((done) => {
  seedDatabase().then(done);
});
