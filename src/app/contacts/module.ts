import * as angular from 'angular';
import * as angularMessages from 'angular-messages';
import * as angularResource from 'angular-resource';
import appCommons from '../commons/module';
import components from './components/config';
import services from './services/config';
import states from './states/config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter,

  appCommons
])
  .config(services)
  .config(components)
  .config(states)
  .name;
