export default class {

  constructor($state, confirm, contact) {
    'ngInject';

    this.$state = $state;
    this.confirm = confirm;
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
