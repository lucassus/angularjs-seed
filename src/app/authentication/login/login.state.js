import controller from './login.controller';
import template from './login.state.html';

export const name = 'login';

export default {
  name,
  url: '/login',
  template,
  controller,
  controllerAs: 'ctrl'
};
