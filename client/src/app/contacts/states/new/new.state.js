import NewComponent from './new.component';

export default function($compileProvider, $stateProvider) {
  'ngInject';

  $compileProvider.component('contactsNew', NewComponent);

  $stateProvider.state('contacts.new', {
    url: '/new',

    component: 'contactsNew',

    ncyBreadcrumb: {
      parent: 'contacts.list',
      label: 'Create contact'
    }
  });

}
