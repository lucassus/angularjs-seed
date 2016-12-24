import template from './show.statate.html';

export function oneAddressShowState($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.one.address.show', {
    url: '',
    template,

    ncyBreadcrumb: {
      parent: 'contacts.one.show({ id: $resolve.contact.id })',
      label: 'Address'
    }
  });

}
