import { indexState } from './index/index.state';
import uiRouter from '@uirouter/angularjs';

export default angular.module('app.about.states', [
  uiRouter
])
  .config(indexState)
  .name;
