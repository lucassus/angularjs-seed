import controller from './controller';
import template from './template.html';

function contacts(Contact) {
  'ngInject';

  return Contact.query().$promise;
}

export default {
  name: 'contacts.list',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contacts
  },

  template,
  url: '/'
};
