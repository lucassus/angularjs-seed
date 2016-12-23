import IndexComponent from './index.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appAboutIndex', IndexComponent);

  $stateProvider.state('about', {
    url: '/about',
    component: 'appAboutIndex'
  });

}
