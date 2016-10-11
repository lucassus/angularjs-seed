import controller from './new.controller';
import template from './new.state.html';

export const name = 'contacts.new';

export default {
  name,
  url: '/new',
  template,
  controller,
  controllerAs: 'ctrl',

  ncyBreadcrumb: {
    parent: 'contacts.list',
    label: 'Create contact'
  }
};
