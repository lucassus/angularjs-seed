import controller from './contact-form.controller';
import template from './contact-form.component.html';

export default {
  template,
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller
};
