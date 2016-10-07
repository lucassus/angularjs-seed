import controller from './show.controller';
import template from './show.statate.html';

export default {
  name: 'contacts.address.show',

  controller,
  controllerAs: 'ctrl',

  template,
  url: '/:id/address'
};
