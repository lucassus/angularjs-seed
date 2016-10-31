import appCommonsModule from '../../commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appCommonsModule}`, () => {

  beforeEach(angular.mock.module(appCommonsModule));

  describe('component: favouriteButton', () => {

    let element, scope;

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();

      element = angular.element(`
        <app-navigation></app-navigation>
      `);

      $compile(element)(scope);
      $rootScope.$digest();
    }));

  });

  describe('controller: appNavigation', () => {

    let ctrl;

    beforeEach(inject(($componentController) => {
      ctrl = $componentController('appNavigation', {
        $state: { go: sinon.stub() },
        auth: { logout: sinon.stub() }
      });
    }));

    describe('.logout', () => {

      beforeEach(() => {
        ctrl.logout();
      });

      it('log out a user', () => {
        expect(ctrl.auth.logout.called).to.be.true;
      });

      it('redirects to the `login` page', () => {
        expect(ctrl.$state.go.calledWith('login')).to.be.true;
      });

    });

  });

});
