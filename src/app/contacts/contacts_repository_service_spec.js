import { expect } from 'chai';
import module from './module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('service: contactsRepository', () => {

    let contactsRepository;

    beforeEach(inject(($injector) => {
      contactsRepository = $injector.get('contactsRepository');
    }));

    describe('.all', () => {

      it('returns all contacts', (done) => {
        contactsRepository.all().then((contacts) => {
          expect(contacts).to.be.an.array;
          expect(contacts).to.have.length(2);
          expect(contacts[0]).to.have.property('id', 1);
          expect(contacts[0]).to.have.property('name', 'foo');
          expect(contacts[1]).to.have.property('id', 2);
          expect(contacts[1]).to.have.property('name', 'bar');

          done();
        });

        inject($rootScope => $rootScope.$digest());
      });

    });

    describe('.find', () => {

      describe('when a contact can be found', () => {

        it('resolve a contact', (done) => {
          contactsRepository.find(1).then((contact) => {
            expect(contact).to.have.property('id', 1);
            expect(contact).to.have.property('name', 'foo');
            done();
          });

          inject($rootScope => $rootScope.$digest());
        });

      });

      describe('when a contact cannot be found', () => {

        it('rejects', (done) => {
          contactsRepository.find(3).catch(() => {
            done();
          });

          inject($rootScope => $rootScope.$digest());
        });

      });

    });

  });

});
