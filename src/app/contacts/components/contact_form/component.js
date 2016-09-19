import controller from './controller';
import template from './template.html';

export default {
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller: controller,
  template
};
