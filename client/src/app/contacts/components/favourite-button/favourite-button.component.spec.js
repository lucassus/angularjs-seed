import assert from 'assert';
import componentsModule from '../components.module';
import sinon from 'sinon';

describe(`module ${componentsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(componentsModule);
  });

  describe('component `appFavouriteButton`', () => {

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
          assert(scope.contact.toggleFavourite.called);
        });

        it('disabled and enabled the button', inject(($rootScope, $q) => {
          // Given
          const deferred = $q.defer();
          scope.contact.toggleFavourite.returns(deferred.promise);

          assert.equal(buttonEl.attr('disabled'), undefined);

          // When
          buttonEl.click();

          // Then
          assert.equal(buttonEl.attr('disabled'), 'disabled');

          // When
          deferred.resolve();
          $rootScope.$digest();

          // Then
          assert.equal(buttonEl.attr('disabled'), undefined);
        }));

      });

      it('has valid star icon', () => {
        const iconEl = buttonEl.find('span');

        assert(iconEl.hasClass('glyphicon-star-empty'));
        assert(!iconEl.hasClass('glyphicon-star'));

        angular.extend(scope.contact, { favourite: true });
        scope.$digest();

        assert(!iconEl.hasClass('glyphicon-star-empty'));
        assert(iconEl.hasClass('glyphicon-star'));
      });

    });

  });

  describe('controller `appFavouriteButton`', () => {

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
      assert(ctrl.contact instanceof Contact);
    }));

    describe('.favourite', () => {

      it('returns `contact.favourite` flag', () => {
        angular.extend(ctrl.contact, { favourite: true });
        assert(ctrl.favourite);

        angular.extend(ctrl.contact, { favourite: false });
        assert(!ctrl.favourite);
      });

    });

    describe('.toggleFavourite', () => {

      it('updates a contact', () => {
        ctrl.toggleFavourite();
        assert(ctrl.contact.toggleFavourite.called);
      });

      it('toggles `saving` flag', inject(($rootScope) => {
        // Given
        assert(!ctrl.saving);

        // When
        ctrl.toggleFavourite();
        assert(ctrl.saving);
        $rootScope.$digest();

        // Then
        assert(!ctrl.saving);
      }));

    });

  });

});
