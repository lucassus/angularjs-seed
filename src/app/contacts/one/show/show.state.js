import controller from './show.controller';
import template from './show.state.html';

export const name = 'contacts.one.show';

export default {
  name,
  url: '',
  template,
  controller,
  controllerAs: 'ctrl',

  ncyBreadcrumb: {
    parent: 'contacts.list',
    label: '{{ctrl.contact.fullName}}'
  }
};
