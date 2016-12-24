import { ListComponent } from './list.component';
import { listResolver } from '../../services/contact/contact.resolvers';

export function listState($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appContactsList', ListComponent);

  $stateProvider.state('contacts.list', {
    url: '',

    resolve: {
      contacts: listResolver
    },
    component: 'appContactsList',

    ncyBreadcrumb: {
      label: 'Contacts'
    }
  });

}
