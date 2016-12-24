import { indexState } from './index/index.state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.about.states', [
  uiRouter
])
  .config(($injector) => {
    $injector.invoke(indexState);
  })
  .name;
