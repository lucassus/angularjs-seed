import controller from './contact-form.controller';
import template from './contact-form.template.html';

export default {
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller: controller,
  template
};
