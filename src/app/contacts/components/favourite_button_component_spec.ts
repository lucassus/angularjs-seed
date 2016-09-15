import * as angular from 'angular';
import { expect } from 'chai';
import module from '../module';
import * as sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('component: contactForm', () => {

    let element, scope;

    beforeEach(inject(($compile, $rootScope, Contact) => {
      scope = $rootScope.$new();
      scope.contact = new Contact({ id: 123, favourite: false });
      sinon.stub(scope.contact, 'toggleFavourite');

      element = angular.element(`
        <favourite-button contact="contact"></favourite-button>
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
          buttonEl.triggerHandler('click');
          expect(scope.contact.toggleFavourite.called).to.be.true;
        });

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
