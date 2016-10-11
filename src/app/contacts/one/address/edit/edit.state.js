import controller from './edit.controller';
import template from './edit.statate.html';

export const name = 'contacts.one.address.edit';

export default {
  name,
  url: '/edit',
  template,
  controller,
  controllerAs: 'ctrl'
};
