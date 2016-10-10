import controller from './address.controller';
import template from './address.template.html';

export const name = 'contacts.one.address';

export default {
  name,
  url: '/address',
  template,
  abstract: true,
  controller,
  controllerAs: 'ctrl'
};
