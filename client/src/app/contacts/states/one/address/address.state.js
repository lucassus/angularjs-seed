import AddressComponent from './address.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appContactsAddress', AddressComponent);

  $stateProvider.state('contacts.one.address', {
    url: '/address',
    abstract: true,
    component: 'appContactsAddress'
  });

}
