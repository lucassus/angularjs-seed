import template from './navigation.component.html';

class Controller {

  constructor(auth) {
    'ngInject';
    this.auth = auth;
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
  }

}

export default {
  template,
  controller: Controller
};
