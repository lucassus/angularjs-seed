import angular from 'angular';
import { states } from './about.config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about', [uiRouter])
  .config(states)
  .name;
