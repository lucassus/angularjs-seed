import controller from './controller';

export default {
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller: controller,
  template: require('./template.html')
};
