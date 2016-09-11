export default class {

  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;

    this.contact = {};
  }

  create() {
    return this.$http.post(`/api/contacts`, this.contact).then((response) => {
      const contact = response.data;
      const { id } = contact;

      return this.$state.go('contacts.show', { id });
    })
  }

}
