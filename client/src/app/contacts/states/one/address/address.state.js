import controller from './address.controller';
import template from './address.template.html';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.one.address', {
    url: '/address',

    template,
    abstract: true,
    controller,
    controllerAs: 'ctrl'
  });

}
