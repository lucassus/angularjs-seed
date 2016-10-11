import controller from './edit.controller';
import template from './edit.state.html';

export const name = 'contacts.one.edit';

export default {
  name,
  url: '/edit',
  template,
  controller,
  controllerAs: 'ctrl'
};
