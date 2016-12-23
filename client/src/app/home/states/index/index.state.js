import indexComponent from './index.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('homeIndex', indexComponent);

  $stateProvider.state('home', {
    url: '/',
    component: 'homeIndex'
  });

}
