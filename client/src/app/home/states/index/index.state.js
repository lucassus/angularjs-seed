import IndexComponent from './index.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appHomeIndex', IndexComponent);

  $stateProvider.state('home', {
    url: '/',
    component: 'appHomeIndex'
  });

}
