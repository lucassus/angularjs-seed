import { expect } from 'chai';
import module from '../../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name, ($provide) => {
      $provide.value('confirm', sinon.stub().returns(true));
    });
  });

  describe('controller: contacts.show', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const { controller } = $state.get('contacts.show');

      ctrl = $controller(controller, {
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
