import controller from './index.controller';
import template from './index.state.html';

export const name = 'home';

export default  {
  name,
  url: '/',
  template,

  controller,
  controllerAs: 'ctrl'
};