import EditComponent from './edit.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsEdit', EditComponent);

  $stateProvider.state('contacts.one.edit', {
    url: '/edit',

    component: 'contactsEdit',

    ncyBreadcrumb: {
      parent: 'contacts.one.show({ id: $resolve.contact.id })',
      label: 'Edit'
    }
  });

}
