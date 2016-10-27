import appContactsModule from '../authentication.module';
import { expect } from 'chai';
import { name } from './login.state';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe(`controller: ${name}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state, auth) => {
      const Controller = $state.get(name).controller;

      ctrl = $controller(Controller, {
        $state: sinon.stub($state),
        auth: sinon.stub(auth)
      });
    }));

    it('is defined', () => {
      expect(ctrl).to.not.be.undefined;
    });

    it('has predefined credentials', () => {
      expect(ctrl.credentials).to.have.property('email');
      expect(ctrl.credentials).to.have.property('password');
    });

    describe('.login', () => {

      describe('on success', () => {

        beforeEach(inject(($q) => {
          ctrl.auth.authenticate.returns($q.resolve());
        }));

        it('redirects to the `home` page', inject(($rootScope) => {
          ctrl.login();
          $rootScope.$digest();

          expect(ctrl.auth.authenticate.calledWith('demo@email.com', 'password'))
            .to.be.true;
          expect(ctrl.$state.go.calledWith('home')).to.be.true;
        }));

      });

      describe('on error', () => {

        beforeEach(inject(($q) => {
          ctrl.auth.authenticate.returns($q.reject());
        }));

        it('does not redirect', inject(($rootScope) => {
          ctrl.login();
          $rootScope.$digest();

          expect(ctrl.$state.go.calledWith('home')).to.be.false;
        }));

      });

    });

  });

});
