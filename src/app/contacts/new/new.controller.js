export default class {

  constructor($state, toastr, contact) {
    'ngInject';

    this.$state = $state;
    this.toastr = toastr;

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
