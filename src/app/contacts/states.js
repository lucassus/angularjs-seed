import create from './states/new/state';
import edit from './states/edit/state';
import list from './states/list/state';
import show from './states/show/state';

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
