import Controller from './show.controller';
import appContactsModule from '../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';
import toastrMockModule from '../../../specs/toastr-mock.module';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule, ($provide) => {
      $provide.value('confirm', sinon.stub().returns(true));
    });

    angular.mock.module(toastrMockModule);
  });

  describe('controller: contacts.show', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      ctrl = $controller(Controller, {
        contact: new Contact({ id: 2, name: 'bar' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('name', 'bar');
    });

    describe('.delete', () => {

      beforeEach(inject(($state) => {
        sinon.stub($state, 'go');
      }));

      describe('when confirmed', () => {

        let requestHandler;

        beforeEach(inject(($httpBackend) => {
          requestHandler = $httpBackend.expectDELETE('/api/contacts/2');

          sinon.spy(ctrl.contact, '$delete');
          ctrl.delete();
        }));

        it('deletes a contact', () => {
          expect(ctrl.contact.$delete.called).to.be.true;
        });

        describe('on success', () => {

          beforeEach(inject(($httpBackend) => {
            requestHandler.respond(200);
            $httpBackend.flush();
          }));

          it('displays a notification', inject((toastr) => {
            expect(toastr.success.calledWith('Contact deleted')).to.be.true;
          }));

          it('redirect to the list page', inject(($state) => {
            expect($state.go.calledWith('contacts.list')).to.be.true;
          }));

        });

        describe('on error', () => {

          beforeEach(inject(($httpBackend) => {
            requestHandler.respond(422);
            $httpBackend.flush();
          }));

          it('does not redirect', inject(($state) => {
            expect($state.go.calledWith('contacts.list')).to.be.false;
          }));

        });

      });

      describe('when not confirmed', () => {

        it('does nothing', inject(($state, confirm) => {
          confirm.returns(false);
          ctrl.delete();
          expect($state.go.called).to.be.false;
        }));

      });

    });

  });

});
