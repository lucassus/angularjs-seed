export default class {

  contact: any;

  constructor(private $state, private confirm, private toastr, contact) {
    'ngInject';

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
