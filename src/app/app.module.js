import { anchorScroll, html5Mode, notFoundState, router } from './app.config';
import _ from 'lodash';
import angularAnimate from 'angular-animate';
import angularLoadingBar from 'angular-loading-bar';
import appAboutModule from './about/about.module';
import appAuthenticationModule from './authentication/authentication.module';
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
  appAuthenticationModule,
  appHomeModule,
  appContactsModule,
  appAboutModule
])
  .config(html5Mode)
  .config(router)
  .config(anchorScroll)
  .config(notFoundState)

  .run(stateErrorsHandler)
  .run(logBuildSignature)

  .run(($state, $transitions, auth) => {
    const publicState = (state) => {
      return _.get(state, 'data.publicState');
    };

    const nonPublicState = (state) => {
      return !_.get(state, 'data.publicState');
    };

    $transitions.onBefore({ to: publicState }, () => {
      if (auth.isAuthenticated()) {
        return $state.target('home');
      }
    });

    $transitions.onBefore({ to: nonPublicState }, () => {
      if (!auth.isAuthenticated()) {
        return $state.target('login');
      }
    });
  })

  .name;
