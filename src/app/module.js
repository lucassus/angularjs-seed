import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularLoadingBar from 'angular-loading-bar';
import appAbout from './about/module';
import appCommons from './commons/module';
import appContacts from './contacts/module';
import appHome from './home/module';
import buildSignature from '../../build_signature_loader!./build_signature.tpl';
import template404 from './404.html';
import uiRouter from 'angular-ui-router';

function router($urlMatcherFactoryProvider, $urlRouterProvider) {
  'ngInject';

  $urlMatcherFactoryProvider.strictMode(true);
  $urlRouterProvider.when('', '/');
}

function notFoundState($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('404', {
      template: template404
    });

  $urlRouterProvider.otherwise(($injector) => {
    $injector.get('$state').go('404');
  });
}

export default angular.module('app', [
  angularAnimate,
  uiRouter,
  angularLoadingBar,

  appCommons.name,
  appHome.name,
  appContacts.name,
  appAbout.name
])
  .config(router)
  .config(notFoundState)
  .run(($log, $rootScope, $state) => {
    'ngInject';

    $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
      $log.error('$stateChangeError', error);
      $state.go('404');
    });
  }).run(($log) => {
    'ngInject';

    $log.info(buildSignature);
  });
