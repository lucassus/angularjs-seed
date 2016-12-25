import { indexState } from './index/index.state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about.states', [
  uiRouter
])
  .config(indexState)
  .name;
