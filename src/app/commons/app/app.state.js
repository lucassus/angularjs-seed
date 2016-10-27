import template from './app.state.html';

export const name = 'app';

export default {
  name,
  template,
  abstract: true,

  // TODO does not work on non reload
  resolve: {
    isAuthenticated: ($state, auth) => {
      'ngInject';

      if (auth.isAuthenticated()) {
        return true;
      } else {
        return $state.go('login');
      }
    }
  }
};
