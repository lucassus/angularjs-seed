export default class {

  contact: any;

  constructor(private $state, private confirm, contact) {
    'ngInject';

    this.contact = contact;
  }

  delete() {
    if (this.confirm(`Do you rally want to delete contact ${this.contact.fullName}?`)) {
      this.contact.$delete().then(() => {
        this.$state.go('contacts.list');
      });
    }
  }

}
