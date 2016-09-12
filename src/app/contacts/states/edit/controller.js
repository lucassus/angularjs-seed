export default class {

  constructor($state, contact) {
    this.$state = $state;
    this.contact = contact;
  }

  update(contact) {
    contact.$update().then((updatedContact) => {
      angular.extend(this.contact, updatedContact);

      const { id } = this.contact;
      this.$state.go('contacts.show', { id });
    });
  }

}
