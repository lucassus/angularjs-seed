export default class {

  contact: any;

  constructor(private $state, private toastr, contact) {
    'ngInject';

    this.contact = contact;
  }

  create(contact) {
    return contact.$create().then((createdContact) => {
      this.toastr.success('Contact created');

      angular.extend(this.contact, createdContact);

      const { id } = this.contact;
      return this.$state.go('contacts.show', { id });
    });
  }

}
