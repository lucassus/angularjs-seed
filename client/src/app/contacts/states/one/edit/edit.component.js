import template from './edit.component.html';

class Controller {

  constructor($state, toastr) {
    'ngInject';

    this.$state = $state;
    this.toastr = toastr;
  }

  update(contact) {
    return contact.$update().then(() => {
      angular.extend(this.contact, contact);
      this.toastr.success('Contact updated');

      const { id } = this.contact;
      return this.$state.go('contacts.one.show', { id });
    }).catch(() => {
      this.toastr.error('Unable to update a contact.');
    });
  }

}

export default {
  bindings: {
    contact: '<'
  },
  controller: Controller,
  template
};
