import controller from './controller';
import template from './template.html';

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
