import controller from './controller';

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

  template: require('./template.html'),
  url: '/new'
};
