export default class {

  constructor($state, confirm, toastr, contact) {
    'ngInject';

    this.$state = $state;
    this.confirm = confirm;
    this.toastr = toastr;

    this.contact = contact;
  }

  delete() {
    if (this.confirm(`Do you rally want to delete contact ${this.contact.fullName}?`)) {
      this.contact.$delete().then(() => {
        this.toastr.success('Contact deleted');
        this.$state.go('contacts.list');
      });
    }
  }

}
