import { listResolver, oneResolver } from './contact.resolvers';
import assert from 'assert';
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
      assert(Contact.query.called);
    });

  });

  describe('.oneResolver', () => {

    it('resolver a record', () => {
      // When
      oneResolver({ id: 123 }, Contact);

      // Then
      assert(Contact.get.calledWith({ id: 123 }));
    });

  });

});
