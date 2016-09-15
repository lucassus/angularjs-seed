import { expect } from 'chai';
import resolveContact from './resolve_contact';
import * as sinon from 'sinon';

describe('.resolveContact', () => {

  it('resolves a contact', (done) => {
    inject(($injector, $q, $rootScope) => {
      const id = 123;

      const $stateParams = { id };

      const Contact = {
        get: sinon.stub().returns({
          $promise: $q.resolve({ id })
        })
      };

      $injector.invoke(resolveContact, null, { $stateParams, Contact })
        .then((contact) => {
          expect(contact).to.have.property('id', id);
          done();
        });

      expect(Contact.get.calledWith({ id })).to.be.true;
      $rootScope.$digest();
    });
  });

});
