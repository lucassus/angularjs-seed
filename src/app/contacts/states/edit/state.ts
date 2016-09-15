import contact from '../../services/resolve_contact';
import controller from './controller';

export default {
  name: 'contacts.edit',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact
  },

  template: require('./template.html'),
  url: '/:id/edit'
};
