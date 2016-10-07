import edit from './edit/edit.state';
import show from './show/show.state';

// TODO dry it
function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('contacts.address', {
      abstract: true,
      resolve: {
        contact
      },
      template: '<div ui-view></div>'
    })

    .state(edit)
    .state(show);
}
