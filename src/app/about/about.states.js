import main from './@main/state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state(main);
}
