import contactsEditComponent from './edit.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsEdit', contactsEditComponent);

  $stateProvider.state('contacts.one.edit', {
    url: '/edit',

    component: 'contactsEdit',

    ncyBreadcrumb: {
      parent: 'contacts.one.show({ id: $resolve.contact.id })',
      label: 'Edit'
    }
  });

}
