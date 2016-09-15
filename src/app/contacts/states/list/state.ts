import controller from './controller';

function contacts(Contact) {
  'ngInject';

  return Contact.query().$promise;
}

export default {
  name: 'contacts.list',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contacts
  },

  template: require('./template.html'),
  url: '/'
};
