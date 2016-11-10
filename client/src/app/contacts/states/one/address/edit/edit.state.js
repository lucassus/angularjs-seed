import template from './edit.statate.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.one.address.edit', {
    url: '/edit',
    template,

    ncyBreadcrumb: {
      parent: 'contacts.one.address.show({ id: ctrl.contact.id })',
      label: 'Edit'
    }
  });

}
