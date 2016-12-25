import directivesModule from '../directives.module';
import { expect } from 'chai';

describe(`module ${directivesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(directivesModule);
  });

  describe('directive: appUniqueEmail', () => {

    let $httpBackend, $timeout, scope;

    beforeEach(inject(($injector, $rootScope) => {
      $httpBackend = $injector.get('$httpBackend');
      $timeout = $injector.get('$timeout');

      scope = $rootScope.$new();
      scope.contact = { id: 123, email: '' };
    }));

    beforeEach(inject(($compile) => {
      const element = angular.element(`
        <form name="testForm">
          <input type="text" name="email" 
                 ng-model="contact.email" app-unique-email />
        </form>
      `);
      $compile(element)(scope);
      scope.$digest();
    }));

    it('sets the correct debounce options', () => {
      expect(scope.testForm.email.$options.getOption('debounce'))
        .to.equal(300);

      expect(scope.testForm.email.$options.getOption('updateOnDefault'))
        .to.equal(true);
    });

    function setEmail(email) {
      scope.testForm.email.$setViewValue(email);
      $timeout.flush(300); // Pass debounce
    }

    describe('when email is taken', () => {

      beforeEach(() => {
        $httpBackend
          .expectGET('/api/contacts/validate-email?email=taken@email.com')
          .respond(200, { taken: true });
      });

      it('fails validation', () => {
        setEmail('taken@email.com');
        $httpBackend.flush();

        expect(scope.testForm.$valid).to.be.false;
        expect(scope.testForm.email.$valid).to.be.false;
        expect(scope.testForm.email.$error).to.have.property('uniqueEmail', true);
        expect(scope.contact.email).to.be.undefined;
      });

    });

    describe('when email is not taken', () => {

      beforeEach(() => {
        $httpBackend
          .expectGET('/api/contacts/validate-email?email=test@email.com')
          .respond(200, { taken: false });
      });

      it('passes validation', () => {
        setEmail('test@email.com');
        $httpBackend.flush();

        expect(scope.testForm.$valid).to.be.true;
        expect(scope.testForm.email.$valid).to.be.true;
        expect(scope.testForm.email.$error).to.not.have.property('uniqueEmail');
        expect(scope.contact.email).to.equal('test@email.com');
      });

    });

    describe('when the resource is persisted', () => {

      beforeEach(inject(($compile) => {
        const element = angular.element(`
          <form name="testForm">
            <input type="text" name="email" 
                   ng-model="contact.email" app-unique-email="contact.id" />
          </form>
        `);
        $compile(element)(scope);
        scope.$digest();
      }));

      beforeEach(() => {
        $httpBackend
          .expectGET('/api/contacts/validate-email?id=123&email=another@email.com')
          .respond(200, { taken: true });
      });

      it('validates uniqueness with id', () => {
        setEmail('another@email.com');
        $httpBackend.flush();

        expect(scope.testForm.$valid).to.be.false;
        expect(scope.testForm.email.$valid).to.be.false;
        expect(scope.testForm.email.$error).to.have.property('uniqueEmail', true);
        expect(scope.contact.email).to.be.undefined;
      });

    });

  });

});
