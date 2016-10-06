import controller from './edit.controller';
import template from './edit.state.html';

function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

export default {
  name: 'contacts.edit',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact
  },

  template,
  url: '/:id/edit'
};
