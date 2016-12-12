export default class {

  constructor($state, toastr, Contact) {
    'ngInject';

    this.$state = $state;
    this.toastr = toastr;

    this.contact = new Contact();
  }

  create(contact) {
    return contact.$create().then(() => {
      angular.extend(this.contact, contact);
      this.toastr.success('Contact created');

      const { id } = this.contact;
      return this.$state.go('contacts.one.show', { id });
    }).catch(() => {
      this.toastr.error('Unable to create a contact.');
    });
  }

}
