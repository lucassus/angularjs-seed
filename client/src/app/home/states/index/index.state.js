import IndexComponent from './index.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('homeIndex', IndexComponent);

  $stateProvider.state('home', {
    url: '/',
    component: 'homeIndex'
  });

}
