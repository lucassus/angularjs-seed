import angular from 'angular';
import appCommonsModule from '../commons/commons.module';
import states from './states/config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.home', [
  uiRouter,
  appCommonsModule
])
  .config(states)
  .name;