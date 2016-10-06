import controller from './show.controller';
import template from './show.state.html';

function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

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
