import EditComponent from './edit.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appContactsEdit', EditComponent);

  $stateProvider.state('contacts.one.edit', {
    url: '/edit',

    component: 'appContactsEdit',

    ncyBreadcrumb: {
      parent: 'contacts.one.show({ id: $resolve.contact.id })',
      label: 'Edit'
    }
  });

}
