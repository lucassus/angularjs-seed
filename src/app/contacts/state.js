import controller from './controller';
import template from './template.html';

export default function($stateProvider) {
  $stateProvider
    .state('contacts', {
      controller,
      controllerAs: 'ctrl',
      resolve: {
        contacts: function() {
          return [
            { id: 1, name: 'foo' },
            { id: 2, name: 'bar' }
          ];
        }
      },
      template,
      url: '/contacts'
    });
}
