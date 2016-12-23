import NewComponent from './new.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('appContactsNew', NewComponent);

  $stateProvider.state('contacts.new', {
    url: '/new',

    component: 'appContactsNew',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: 'Create contact'
    }
  });

}
