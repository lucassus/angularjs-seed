import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.show',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact: function($stateParams, contactsRepository) {
      return contactsRepository.find($stateParams.id);
    }
  },

  template,
  url: '/{id:int}'
}
