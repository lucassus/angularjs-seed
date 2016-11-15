import indexState from './index/index.state';

export function states($stateProvider) {
  'ngInject';

  $stateProvider
    .state(indexState);
}
