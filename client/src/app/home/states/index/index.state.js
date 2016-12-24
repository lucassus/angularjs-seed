import { IndexComponent } from './index.component';

export function indexState($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appHomeIndex', IndexComponent);

  $stateProvider.state('home', {
    url: '/',
    component: 'appHomeIndex'
  });

}
