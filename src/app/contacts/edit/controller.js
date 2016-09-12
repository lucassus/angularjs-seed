export default class {

  constructor($state, contact) {
    this.$state = $state;
    this.contact = contact;
  }

  update() {
    this.contact.$update().then(({ id }) => {
      this.$state.go('contacts.show', { id });
    });
  }

}
