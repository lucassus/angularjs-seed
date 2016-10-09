import controller from './address.controller';
import template from './address.template.html';

export default {
  template,
  abstract: true,
  // TODO add eslint rule
  controller: controller,
  controllerAs: 'ctrl'
};
