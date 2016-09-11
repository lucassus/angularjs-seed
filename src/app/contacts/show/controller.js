export default class {

  constructor($http, $state, contact) {
    this.$http = $http;
    this.$state = $state;
    this.contact = contact;
  }

  delete() {
    const { id } = this.contact;

    return this.$http.delete(`/api/contacts/${id}`).then(() => {
      return this.$state.go('contacts.list');
    });
  }

}
