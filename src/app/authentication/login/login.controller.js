export default class {

  constructor($state, auth) {
    'ngInject';

    this.$state = $state;
    this.auth = auth;

    this.credentials = {
      email: 'demo@email.com',
      password: 'password'
    };
  }

  login() {
    return this.auth.authenticate('demo@email.com', 'password').then(() => {
      return this.$state.go('home');
    });
  }

}
