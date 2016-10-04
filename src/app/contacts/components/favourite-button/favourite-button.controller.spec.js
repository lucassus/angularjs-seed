import angular from 'angular';
import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('controller: favouriteButton', () => {

    let ctrl;

    beforeEach(inject(($componentController, $q, Contact) => {
      const contact = new Contact({ id: 123, favourite: false });
      sinon.stub(contact, 'toggleFavourite').returns($q.resolve());

      ctrl = $componentController('appFavouriteButton', {}, {
        contact
      });

      ctrl.$onInit();
    }));

    it('has a `contact`', inject((Contact) => {
      expect(ctrl.contact).to.be.an.instanceOf(Contact);
    }));

    describe('.favourite', () => {

      it('returns `contact.favourite` flag', () => {
        angular.extend(ctrl.contact, { favourite: true });
        expect(ctrl.favourite).to.be.true;

        angular.extend(ctrl.contact, { favourite: false });
        expect(ctrl.favourite).to.be.false;
      });

    });

    describe('.toggleFavourite', () => {

      it('updates a contact', () => {
        ctrl.toggleFavourite();
        expect(ctrl.contact.toggleFavourite.called).to.be.true;
      });

      it('toggles `saving` flag', inject(($rootScope) => {
        // Given
        expect(ctrl.saving).to.be.false;

        // When
        ctrl.toggleFavourite();
        expect(ctrl.saving).to.be.true;
        $rootScope.$digest();

        // Then
        expect(ctrl.saving).to.be.false;
      }));

    });

  });

});
