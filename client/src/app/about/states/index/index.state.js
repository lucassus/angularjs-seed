import indexComponent from './index.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('aboutIndex', indexComponent);

  $stateProvider.state('about', {
    url: '/about',
    component: 'aboutIndex'
  });

}
