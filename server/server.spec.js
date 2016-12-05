const expect = require('chai').expect;
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

    expect(db.seed.called).to.be.true;
    expect(app.listen.called).to.be.true;
  });

});
