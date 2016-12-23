import IndexComponent from './index.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('aboutIndex', IndexComponent);

  $stateProvider.state('about', {
    url: '/about',
    component: 'aboutIndex'
  });

}
