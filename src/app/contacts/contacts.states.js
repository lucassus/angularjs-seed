import create from './@new/new.state';
import edit from './@edit/edit.state';
import list from './@list/list.state';
import show from './@show/show.state';

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
