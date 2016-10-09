import index from './index/index.state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home',
      angular.extend({ url: '/' }, index));
}
