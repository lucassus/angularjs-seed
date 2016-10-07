import controller from './new.controller';
import template from './new.state.html';

function contact(Contact) {
  'ngInject';

  return new Contact();
}

export default {
  controller,
  controllerAs: 'ctrl',
  resolve: {
    contact
  },

  template,
  url: '/new'
};
