import controller from './list.controller';
import template from './list.state.html';

function contacts(Contact) {
  'ngInject';
  return Contact.query().$promise;
}

export default {
  template,
  controller,
  controllerAs: 'ctrl',

  resolve: {
    contacts
  }
};
