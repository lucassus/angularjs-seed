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
        this.$state.go('contacts.list');
      });
    }
  }

}
