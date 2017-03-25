const assert = require('power-assert');
const sinon = require('sinon');

const app = require('./app');
const db = require('./db');

describe('server', () => {

  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    sandbox.stub(console, 'log');

    sandbox.stub(db, 'seed').returns({
      then: sinon.stub().yields([])
    });

    sandbox.stub(app, 'listen').yields();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('seeds the db and starts the app', () => {
    require('./server');

    assert(db.seed.called);
    assert(app.listen.called);
  });

});
