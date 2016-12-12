export default class {

  constructor($state, confirm, toastr, contact) {
    'ngInject';

    this.$state = $state;
    this.confirm = confirm;
    this.toastr = toastr;

    this.contact = contact;
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
