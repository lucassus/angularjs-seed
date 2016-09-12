export default class {

  constructor($state, contact) {
    this.$state = $state;
    this.contact = contact;
  }

  create() {
    this.contact.$create().then(({ id }) => {
      this.$state.go('contacts.show', { id });
    });
  }

}
