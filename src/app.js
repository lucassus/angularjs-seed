import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';
import * as modules from './modules';
import angular from 'angular';
import template404 from './app/404.html';
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

  modules.about.name,
  modules.contacts.name,
  modules.home.name,
])
  .config(router)
  .config(notFoundState)
  .run(($log, $rootScope, $state) => {
    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      $log.error('$stateChangeError', error);
      $state.go('404');
    });
  });
