import appCommonsModule from '../commons/commons.module';
import { states } from './authentication.config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.authentication', [
  uiRouter,
  appCommonsModule
])
  .config(states)
  .name;
