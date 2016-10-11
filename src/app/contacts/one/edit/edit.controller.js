export default class {

  constructor($state, toastr, contact) {
    'ngInject';

    this.$state = $state;
    this.toastr = toastr;

    this.contact = contact;
  }

  update(contact) {
    return contact.$update().then((updatedContact) => {
      angular.extend(this.contact, updatedContact);
      this.toastr.success('Contact updated');

      const { id } = this.contact;
      return this.$state.go('contacts.show', { id });
    });
  }

}
