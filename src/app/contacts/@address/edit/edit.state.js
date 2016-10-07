import controller from './edit.controller';
import template from './edit.statate.html';

export default {
  name: 'contacts.address.edit',

  controller,
  controllerAs: 'ctrl',

  template,
  url: '/:id/address/edit'
};
