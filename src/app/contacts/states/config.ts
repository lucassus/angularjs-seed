import create from './new/state';
import edit from './edit/state';
import list from './list/state';
import show from './show/state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view></div>'
    })

    .state(create)
    .state(edit)
    .state(list)
    .state(show);
}
