import controller from './controller';
import template from './template.html';

function contact(Contact) {
  'ngInject';

  return new Contact();
}

export default {
  name: 'contacts.new',

  controller,
  controllerAs: 'ctrl',
  resolve: {
    contact
  },

  template,
  url: '/new'
};
