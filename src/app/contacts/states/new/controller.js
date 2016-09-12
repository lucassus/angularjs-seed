export default class {

  constructor($state, contact) {
    this.$state = $state;
    this.contact = contact;
  }

  create(contact) {
    contact.$create().then((createdContact) => {
      angular.extend(this.contact, createdContact);

      const { id } = this.contact;
      this.$state.go('contacts.show', { id });
    });
  }

}
