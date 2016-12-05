import { listResolver, oneResolver } from './contact.resolvers';
import { expect } from 'chai';
import sinon from 'sinon';

describe('contact.resolvers', () => {

  const Contact = {
    query: sinon.stub().returns({ $query: {} }),
    get: sinon.stub().returns({ $query: {} })
  };

  describe('.listResolver', () => {

    it('resolves a list', () => {
      // When
      listResolver(Contact);

      // Then
      expect(Contact.query.called).to.be.true;
    });

  });

  describe('.oneResolver', () => {

    it('resolver a record', () => {
      // When
      oneResolver({ id: 123 }, Contact);

      // Then
      expect(Contact.get.calledWith({ id: 123 })).to.be.true;
    });

  });

});
