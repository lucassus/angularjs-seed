import controller from './index.controller';
import template from './index.state.html';

export const name = 'home';

export default  {
  parent: 'app',

  name,
  url: '/',
  template,

  controller,
  controllerAs: 'ctrl'
};
