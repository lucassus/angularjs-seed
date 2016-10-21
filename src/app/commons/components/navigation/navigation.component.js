import template from './navigation.component.html';

class Controller {

  constructor(auth) {
    'ngInject';
    this.auth = auth;
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  login() {
    this.auth.authenticate('demo@email.com', 'password');
  }

  logout() {
    this.auth.logout();
  }

}

export default {
  template,
  controller: Controller
};
