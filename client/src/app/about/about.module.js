import states from './states/states.config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about', [uiRouter])
  .config(states)
  .name;
