import commonsModule from '../../commons/commons.module';
import { indexState } from './index/index.state';
import uiRouter from '@uirouter/angularjs';

export default angular.module('app.home.states', [
  uiRouter,
  commonsModule
])
  .config(indexState)
  .name;
