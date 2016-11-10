import controller from './index.controller';
import template from './index.state.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('home', {
    url: '/',
    template,

    controller,
    controllerAs: 'ctrl'
  });

}
