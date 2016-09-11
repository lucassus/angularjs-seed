import list from './list/state';
import show from './show/state';

export default function($stateProvider) {
  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view></div>'
    })
    .state(list)
    .state(show);
}
