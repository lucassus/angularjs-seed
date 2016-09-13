import { resolveContact as contact } from '../../services/contact_resource';
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
