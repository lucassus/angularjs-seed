import template from './index.state.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('about', {
    url: '/about',
    template
  });

}
