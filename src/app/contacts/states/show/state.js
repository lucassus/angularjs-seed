import contact from '../../services/resolve_contact';
import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.show',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact
  },

  template,
  url: '/:id'
};
