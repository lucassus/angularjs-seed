import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('component: favouriteButton', () => {

    let element, scope;

    beforeEach(inject(($compile, $q, $rootScope, Contact) => {
      scope = $rootScope.$new();
      scope.contact = new Contact({ id: 123, favourite: false });

      sinon.stub(scope.contact, 'toggleFavourite')
        .returns($q.resolve());

      element = angular.element(`
        <app-favourite-button contact="contact"></app-favourite-button>
      `);

      $compile(element)(scope);
      $rootScope.$digest();
    }));

    describe('element', () => {

      let buttonEl;

      beforeEach(() => {
        buttonEl = element.find('button');
      });

      describe('on click', () => {

        it('toggles contact favourite flag', () => {
          buttonEl.click();
          expect(scope.contact.toggleFavourite.called).to.be.true;
        });

        it('disabled and enabled the button', inject(($rootScope, $q) => {
          // Given
          const deferred = $q.defer();
          scope.contact.toggleFavourite.returns(deferred.promise);

          expect(buttonEl.attr('disabled')).to.be.undefined;

          // When
          buttonEl.click();

          // Then
          expect(buttonEl.attr('disabled')).to.eq('disabled');

          // When
          deferred.resolve();
          $rootScope.$digest();

          // Then
          expect(buttonEl.attr('disabled')).to.be.undefined;
        }));

      });

      it('has valid star icon', () => {
        const iconEl = buttonEl.find('span');

        expect(iconEl.hasClass('glyphicon-star-empty'))
          .to.be.true;
        expect(iconEl.hasClass('glyphicon-star'))
          .to.be.false;

        angular.extend(scope.contact, { favourite: true });
        scope.$digest();

        expect(iconEl.hasClass('glyphicon-star-empty'))
          .to.be.false;
        expect(iconEl.hasClass('glyphicon-star'))
          .to.be.true;
      });

    });

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
