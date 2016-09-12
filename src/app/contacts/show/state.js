import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.show',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact: function($stateParams, Contact) {
      const { id } = $stateParams;
      return Contact.get({ id }).$promise;
    }
  },

  template,
  url: '/:id'
}
