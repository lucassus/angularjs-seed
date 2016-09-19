export default class {

  constructor($state, contact) {
    'ngInject';

    this.$state = $state;
    this.contact = contact;
  }

  update(contact) {
    return contact.$update().then((updatedContact) => {
      angular.extend(this.contact, updatedContact);

      const { id } = this.contact;
      return this.$state.go('contacts.show', { id });
    });
  }

}
