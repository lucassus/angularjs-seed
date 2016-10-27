import loginState from './login/login.state';

export function states($stateProvider) {
  'ngInject';

  $stateProvider
    .state(loginState);
}
