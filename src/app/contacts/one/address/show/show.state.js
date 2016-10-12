import controller from './show.controller';
import template from './show.statate.html';

export const name = 'contacts.one.address.show';

export default {
  name,
  url: '',
  template,
  controller,
  controllerAs: 'ctrl',

  ncyBreadcrumb: {
    parent: 'contacts.one.show({ id: ctrl.contact.id })',
    label: 'Address'
  }
};
