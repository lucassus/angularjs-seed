import controller from './list.controller';
import template from './list.state.html';

function contacts(Contact) {
  'ngInject';
  return Contact.query().$promise;
}

export const name = 'contacts.list';

export default {
  name,
  url: '',
  template,
  resolve: {
    contacts
  },
  controller,
  controllerAs: 'ctrl',

  ncyBreadcrumb: {
    label: 'Contacts'
  }
};
