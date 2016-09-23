export default class {

  contact: any;

  constructor(private $state, private toastr, contact) {
    'ngInject';

    this.contact = contact;
  }

  update(contact) {
    return contact.$update().then((updatedContact) => {
      this.toastr.success('Contact updated');

      angular.extend(this.contact, updatedContact);

      const { id } = this.contact;
      return this.$state.go('contacts.show', { id });
    });
  }

}
