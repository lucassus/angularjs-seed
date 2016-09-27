import controller from './controller';

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

  template: require('./template.html'),
  url: '/:id'
};
