import _ from 'lodash';
import { listState } from './list/list.state';
import { newState } from './new/new.state';
import { oneAddressEditState } from './one/address/edit/edit.state';
import { oneAddressShowState } from './one/address/show/show.state';
import { oneAddressState } from './one/address/address.state';
import { oneEditState } from './one/edit/edit.state';
import { oneShowState } from './one/show/show.state';
import { oneState } from './one/one.state';

export function states($injector, $stateProvider) {
  'ngInject';

  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view autoscroll="true"></div>'
    });

  _.forEach([
    listState,
    newState,

    oneState,
    oneShowState,
    oneEditState,

    oneAddressState,
    oneAddressShowState,
    oneAddressEditState
  ], $injector.invoke);
}
