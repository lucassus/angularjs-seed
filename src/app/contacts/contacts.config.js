import listState from './list/list.state';
import newState from './new/new.state';
import oneAddressEditState from './one/address/edit/edit.state';
import oneAddressShowState from './one/address/show/show.state';
import oneAddressState from './one/address/address.state';
import oneEditState from './one/edit/edit.state';
import oneShowState from './one/show/show.state';
import oneState from './one/one.state';

export function states($stateProvider) {
  'ngInject';

  $stateProvider
    .state({
      name: 'contacts',
      abstract: true,
      url: '/contacts',
      template: '<div ui-view></div>'
    })

    .state(listState)
    .state(newState)

    .state(oneState)
    .state(oneShowState)
    .state(oneEditState)

    .state(oneAddressState)
    .state(oneAddressShowState)
    .state(oneAddressEditState);
}
