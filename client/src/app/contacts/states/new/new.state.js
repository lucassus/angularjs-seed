import contactsNewComponent from './new.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsNew', contactsNewComponent)

  $stateProvider.state('contacts.new', {
    url: '/new',

    component: 'contactsNew',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: 'Create contact'
    }
  });

}
