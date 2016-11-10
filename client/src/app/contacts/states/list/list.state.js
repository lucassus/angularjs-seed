import controller from './list.controller';
import { listResolver } from '../../services/contact/contact.resolvers';
import template from './list.state.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.list', {
    url: '',

    template,
    resolve: {
      contacts: listResolver
    },
    controller,
    controllerAs: 'ctrl',

    ncyBreadcrumb: {
      label: 'Contacts'
    }
  });

}
