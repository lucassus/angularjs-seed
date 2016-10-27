import appCommonsModule from '../commons/commons.module';
import { states } from './about.config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about', [
  uiRouter,
  appCommonsModule
])
  .config(states)
  .name;
