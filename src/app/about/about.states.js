import index from './index/index.state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('about',
      angular.extend({ url: '/about' }, index));
}
