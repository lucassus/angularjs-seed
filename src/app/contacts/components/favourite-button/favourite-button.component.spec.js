import angular from 'angular';
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

});
