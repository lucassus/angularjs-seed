import angular from 'angular';
import commonsModule from '../commons/module';
import states from './states/config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.home', [
  uiRouter,
  commonsModule
])
  .config(states)
  .name;
