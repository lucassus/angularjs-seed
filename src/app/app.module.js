import { notFoundState, router } from './config';
import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularLoadingBar from 'angular-loading-bar';
import appAboutModule from './about/about.module';
import appCommonsModule from './commons/commons.module';
import appContactsModule from './contacts/contacts.module';
import appHomeModule from './home/home.module';
import buildSignature from '../../build_signature_loader!./build_signature.tpl';
import uiRouter from 'angular-ui-router';

function stateErrorsHandler($log, $rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $log.error('$stateChangeError', error);
    $state.go('404');
  });
}

function logBuildSignature($log) {
  'ngInject';
  $log.info(buildSignature);
}

export default angular.module('app', [
  angularAnimate,
  uiRouter,
  angularLoadingBar,

  appCommonsModule,
  appHomeModule,
  appContactsModule,
  appAboutModule
])
  .config(router)
  .config(notFoundState)
  .run(stateErrorsHandler)
  .run(logBuildSignature)
  .name;
