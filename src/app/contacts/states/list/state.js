import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.list',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contacts: function(Contact) {
      return Contact.query().$promise;
    }
  },

  template
}
