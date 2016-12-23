import template from './show.component.html';

class Controller {

  constructor($state, confirm, toastr) {
    'ngInject';

    this.$state = $state;
    this.confirm = confirm;
    this.toastr = toastr;
  }

  delete() {
    const message = `Do you rally want to delete contact ${this.contact.fullName}?`;

    if (this.confirm(message)) {
      this.contact.$delete().then(() => {
        this.toastr.success('Contact deleted');
        return this.$state.go('contacts.list');
      }).catch(() => {
        this.toastr.error('Unable to delete a contact.');
      });
    }
  }

}

export default {
  bindings: {
    contact: '<'
  },
  controller: Controller,
  template
}
