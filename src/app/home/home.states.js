import indexState from './index/index.state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state(indexState);
}
