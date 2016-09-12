import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.new',

  controller,
  controllerAs: 'ctrl',
  resolve: {
    contact: function(Contact) {
      return new Contact();
    }
  },

  template,
  url: '/new'
}
