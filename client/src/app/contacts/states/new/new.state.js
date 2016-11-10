import controller from './new.controller';
import template from './new.state.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.new', {
    url: '/new',

    template,
    controller,
    controllerAs: 'ctrl',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: 'Create contact'
    }
  });

}
