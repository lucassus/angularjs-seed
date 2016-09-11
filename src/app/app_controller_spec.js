import { expect } from 'chai';
import appModule from '../app';
import 'angular-mocks';

describe('module `app`', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
  });

  describe('controller `AppController`', () => {

    let ctrl;

    beforeEach(angular.mock.inject(($controller) => {
      ctrl = $controller('AppController');
    }));

    it('has a message', () => {
      expect(ctrl.message).to.eq('Hello World!');
    });

  });

});
