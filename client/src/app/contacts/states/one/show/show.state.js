import ShowComponent from './show.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsShow', ShowComponent);

  $stateProvider.state('contacts.one.show', {
    url: '',

    component: 'contactsShow',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: '{{$resolve.contact.fullName}}'
    }
  });

}
