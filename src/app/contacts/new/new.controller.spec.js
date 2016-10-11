import appContactsModule from '../contacts.module';
import { expect } from 'chai';
import { name } from './new.state';
import sinon from 'sinon';
import toastrMockModule from '../../../specs/toastr-mock.module';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
    angular.mock.module(toastrMockModule);
  });

  describe(`controller: ${name}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state) => {
      const Controller = $state.get(name).controller;
      ctrl = $controller(Controller);
    }));

    it('has a contact', inject((Contact) => {
      expect(ctrl.contact).to.be.an.instanceOf(Contact);
    }));

    describe('.create', () => {

      let contact;

      beforeEach(inject(($state, Contact) => {
        sinon.stub($state, 'go');

        contact = new Contact({ firstName: 'Luke' });
      }));

      it('returns a promise', () => {
        expect(ctrl.create(contact)).to.be.a.promise;
      });

      describe('on success', () => {

        beforeEach(inject(($q) => {
          sinon.stub(contact, '$create', function() {
            angular.extend(this, { id: 123, createdAt: new Date() });
            return $q.resolve(this);
          });
        }));

        it('creates a contact', (done) => {
          inject(($rootScope, $state, toastr) => {
            ctrl.create(contact).then(() => {
              // ...assigns data from the server
              expect(ctrl.contact).to.have.property('id', 123);
              expect(ctrl.contact).to.have.property('firstName', 'Luke');
              expect(ctrl.contact).to.have.property('createdAt');

              // ...displays a notification
              expect(toastr.success.calledWith('Contact created')).to.be.true;

              // ...redirects to the show page
              expect($state.go.calledWith('contacts.one.show')).to.be.true;

              done();
            });

            $rootScope.$digest();
          });
        });

      });

      describe('on error', () => {

        beforeEach(inject(($q) => {
          sinon.stub(contact, '$create', () => {
            return $q.reject();
          });
        }));

        it('does not create a contact', (done) => {
          inject(($rootScope, $state) => {
            ctrl.create(contact).finally(() => {
              expect(ctrl.contact).to.not.have.property('id');
              expect($state.go.calledWith('contacts.one.show')).to.be.false;

              done();
            });

            $rootScope.$digest();
          });
        });

      });

    });

  });

});
