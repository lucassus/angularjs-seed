import template from './show.component.html';

class Controller {

  constructor($state, confirmation, toastr) {
    'ngInject';

    this.$state = $state;
    this.confirmation = confirmation;
    this.toastr = toastr;
  }

  delete() {
    const message = `Do you rally want to delete contact ${this.contact.fullName}?`;

    if (this.confirmation.show(message)) {
      this.contact.$delete().then(() => {
        this.toastr.success('Contact deleted');
        return this.$state.go('contacts.list');
      }).catch(() => {
        this.toastr.error('Unable to delete a contact.');
      });
    }
  }

}

export const ShowComponent = {
  bindings: {
    contact: '<'
  },
  controller: Controller,
  template
};
