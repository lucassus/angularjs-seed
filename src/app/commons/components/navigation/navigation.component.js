import template from './navigation.component.html';

class Controller {

  constructor($state, auth) {
    'ngInject';

    this.$state = $state;
    this.auth = auth;
  }

  logout() {
    this.auth.logout();
    this.$state.go('login');
  }

}

export default {
  template,
  controller: Controller
};
