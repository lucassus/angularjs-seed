import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about', [uiRouter])
  .config(states)
  .name;
