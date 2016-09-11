export default class {

  constructor($http, $state, contact) {
    this.$http = $http;
    this.$state = $state;

    this.contact = contact;
  }

  update() {
    const { id } = this.contact;

    return this.$http.put(`/api/contacts/${id}`, this.contact).then(() => {
      return this.$state.go('contacts.show', { id });
    })
  }

}
