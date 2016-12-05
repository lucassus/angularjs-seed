import controller from './list.controller';
import { listResolver } from '../../services/contact/contact.resolvers';
import template from './list.state.html';

export const name = 'contacts.list';

export default {
  name,
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
};
