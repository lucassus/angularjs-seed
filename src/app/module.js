import { notFoundState, router } from './config';
import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularLoadingBar from 'angular-loading-bar';
import appAbout from './about/module';
import appCommons from './commons/module';
import appContacts from './contacts/module';
import appHome from './home/module';
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

  appCommons,
  appHome,
  appContacts,
  appAbout
])
  .config(router)
  .config(notFoundState)
  .run(stateErrorsHandler)
  .run(logBuildSignature)
  .name;
