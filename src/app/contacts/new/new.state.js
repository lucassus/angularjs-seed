import controller from './new.controller';
import template from './new.state.html';

function contact(Contact) {
  'ngInject';

  return new Contact();
}

export default {
  template,
  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact
  }
};
