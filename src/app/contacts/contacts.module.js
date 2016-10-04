import angular from 'angular';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import appCommonsModule from '../commons/commons.module';
import components from './components/config';
import services from './services/config';
import states from './states/config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter,

  appCommonsModule
])
  .config(services)
  .config(components)
  .config(states)
  .name;
