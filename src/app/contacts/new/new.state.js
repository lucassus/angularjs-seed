import controller from './new.controller';
import template from './new.state.html';

function contact(Contact) {
  'ngInject';

  return new Contact();
}

export const name = 'contacts.new';

export default {
  name,
  url: '/new',
  template,
  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact
  }
};
