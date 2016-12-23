import contactsAddressComponent from './address.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsAddress', contactsAddressComponent);

  $stateProvider.state('contacts.one.address', {
    url: '/address',
    abstract: true,
    component: 'contactsAddress'
  });

}
