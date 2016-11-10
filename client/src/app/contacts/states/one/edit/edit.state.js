import controller from './edit.controller';
import template from './edit.state.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.one.edit', {
    url: '/edit',

    template,
    controller,
    controllerAs: 'ctrl',

    ncyBreadcrumb: {
      parent: 'contacts.one.show({ id: ctrl.contact.id })',
      label: 'Edit'
    }
  });

}
