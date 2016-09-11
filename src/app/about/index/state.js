import template from './template.html';

export default function($stateProvider) {
  $stateProvider
    .state('about', {
      template,
      url: '/about'
    });
}
