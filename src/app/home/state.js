import controller from './controller';
import template from './template.html';

export default function($stateProvider) {
  $stateProvider
    .state('home', {
      controller,
      controllerAs: 'ctrl',
      template,
      url: '/'
    });
}
