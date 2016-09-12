import angular from 'angular';
import appAbout from './about/module';
import appContacts from './contacts/module';
import appHome from './home/module';
import template404 from './404.html';
import uiRouter from 'angular-ui-router';

function router($urlMatcherFactoryProvider, $urlRouterProvider) {
  $urlMatcherFactoryProvider.strictMode(true);
  $urlRouterProvider.when('', '/');
}

function notFoundState($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('404', {
      template: template404
    });

  $urlRouterProvider.otherwise(($injector) => {
    $injector.get('$state').go('404');
  });
}

export default angular.module('app', [
  uiRouter,

  appAbout.name,
  appContacts.name,
  appHome.name
])
  .config(router)
  .config(notFoundState)
  .run(($log, $rootScope, $state) => {
    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      $log.error('$stateChangeError', error);
      $state.go('404');
    });
  });
