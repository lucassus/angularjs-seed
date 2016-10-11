import template from './edit.statate.html';

export const name = 'contacts.one.address.edit';

export default {
  name,
  url: '/edit',
  template,

  ncyBreadcrumb: {
    parent: 'contacts.one.address.show({ id: ctrl.contact.id })',
    label: 'Edit'
  }
};
