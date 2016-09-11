import angular from 'angular';
import state from './index/state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.home', [uiRouter])
  .config(state);
