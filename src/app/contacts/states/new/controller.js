export default class {

  constructor($state, contact) {
    'ngInject';

    this.$state = $state;
    this.contact = contact;
  }

  create(contact) {
    return contact.$create().then((createdContact) => {
      angular.extend(this.contact, createdContact);

      const { id } = this.contact;
      return this.$state.go('contacts.show', { id });
    });
  }

}
