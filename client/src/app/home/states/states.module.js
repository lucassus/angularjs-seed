import commonsModule from '../../commons/commons.module';
import { indexState } from './index/index.state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.home.states', [
  uiRouter,
  commonsModule
])
  .config(indexState)
  .name;
