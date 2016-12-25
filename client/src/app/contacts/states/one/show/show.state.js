import { ShowComponent } from './show.component';

export function oneShowState($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appContactsShow', ShowComponent);

  $stateProvider.state('contacts.one.show', {
    url: '',

    component: 'appContactsShow',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: '{{$resolve.contact.fullName}}'
    }
  });

}
