import * as angular from 'angular';
import appAbout from './about/module';
import appCommons from './commons/module';
import appContacts from './contacts/module';
import appHome from './home/module';
import uiRouter from 'angular-ui-router';

const buildSignature = require('../../build_signature_loader!./build_signature.tpl')

function router($urlMatcherFactoryProvider, $urlRouterProvider) {
  'ngInject';

  $urlMatcherFactoryProvider.strictMode(true);
  $urlRouterProvider.when('', '/');
}

function notFoundState($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('404', {
      template: require('./404.html')
    });

  $urlRouterProvider.otherwise(($injector) => {
    $injector.get('$state').go('404');
  });
}

export default angular.module('app', [
  uiRouter,

  appCommons.name,
  appHome.name,
  appContacts.name,
  appAbout.name
])
  .config(router)
  .config(notFoundState)
  .run(($log: angular.ILogService, $rootScope: angular.IScope, $state) => {
    'ngInject';

    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      $log.error('$stateChangeError', error);
      $state.go('404');
    });
  }).run(($log: angular.ILogService) => {
    'ngInject';

    $log.info(buildSignature);
  });
