import { IndexComponent } from './index.component';

export function indexState($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appAboutIndex', IndexComponent);

  $stateProvider.state('about', {
    url: '/about',
    component: 'appAboutIndex'
  });

}
