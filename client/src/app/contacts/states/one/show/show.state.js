import controller from './show.controller';
import template from './show.state.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.one.show', {
    url: '',

    template,
    controller,
    controllerAs: 'ctrl',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: '{{ctrl.contact.fullName}}'
    }
  });

}
