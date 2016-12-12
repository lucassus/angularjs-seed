export default class {

  constructor($state, toastr, contact) {
    'ngInject';

    this.$state = $state;
    this.toastr = toastr;

    this.contact = contact;
  }

  update(contact) {
    return contact.$update().then(() => {
      angular.extend(this.contact, contact);
      this.toastr.success('Contact updated');

      const { id } = this.contact;
      return this.$state.go('contacts.one.show', { id });
    }).catch(() => {
      this.toastr.error('Unable to update a contact.');
    });
  }

}
