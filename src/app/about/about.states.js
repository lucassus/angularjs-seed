import main from './@main/main.state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state(main);
}
