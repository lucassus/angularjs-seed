import listComponent from './list.component';
import { listResolver } from '../../services/contact/contact.resolvers';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsList', listComponent);

  $stateProvider.state('contacts.list', {
    url: '',

    resolve: {
      contacts: listResolver
    },
    component: 'contactsList',

    ncyBreadcrumb: {
      label: 'Contacts'
    }
  });

}
