import angular from 'angular';
import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.home', [uiRouter])
  .config(states);
