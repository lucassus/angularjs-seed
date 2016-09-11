import angular from 'angular';
import state from './index/state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about', [uiRouter])
  .config(state);
