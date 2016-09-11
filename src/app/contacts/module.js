import angular from 'angular';
import state from './state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [uiRouter])
  .config(state);
