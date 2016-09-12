export default class {

  constructor($state, contact) {
    this.$state = $state;
    this.contact = contact;
  }

  delete() {
    this.contact.$delete().then(() => {
      this.$state.go('contacts.list');
    });
  }

}
