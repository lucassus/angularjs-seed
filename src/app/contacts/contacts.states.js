import listState from './list/list.state';
import newState from './new/new.state';
import oneAddressEditState from './one/address/edit/edit.state';
import oneAddressShowState from './one/address/show/show.state';
import oneAddressState from './one/address/address.state';
import oneEditState from './one/edit/edit.state';
import oneShowState from './one/show/show.state';
import oneState from './one/one.state';

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view></div>'
    })

    .state('contacts.list',
      angular.extend({ url: '' }, listState))

    .state('contacts.new',
      angular.extend({ url: '/new' }, newState))

    .state('contacts.one',
      angular.extend({ url: '/:id' }, oneState))

    .state('contacts.one.show',
      angular.extend({ url: '' }, oneShowState))

    .state('contacts.one.edit',
      angular.extend({ url: '/edit' }, oneEditState))

    .state('contacts.one.address',
      angular.extend({ url: '/address' }, oneAddressState))

    .state('contacts.one.address.show',
      angular.extend({ url: '' }, oneAddressShowState))

    .state('contacts.one.address.edit',
      angular.extend({ url: '/edit' }, oneAddressEditState));
}
