import appContactsModule from '../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('component: appLocationMap', () => {

    let element, scope;

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      scope.location = { lat: 10, lon: -20 };

      element = angular.element(`
        <app-location-map location="location"></app-location-map>
      `);

      $compile(element)(scope);
      $rootScope.$digest();
    }));

    it('displays a map', () => {
      expect(element.find('.leaflet-container')).to.have.length(1);
    });

  });

});
