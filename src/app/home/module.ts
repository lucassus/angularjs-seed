import * as angular from 'angular';
import states from './states/config';
import uiRouter from 'angular-ui-router';
import commonsModule from '../commons/module';

export default angular.module('app.home', [
  uiRouter,
  commonsModule
])
  .config(states)
  .name;
