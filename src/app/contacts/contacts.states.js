import contactsList from './list/list.state';
import contactsNew from './new/new.state';
import contactsOneAddressEdit from './one/address/edit/edit.state';
import contactsOneAddressShow from './one/address/show/show.state';
import contactsOneEdit from './one/edit/edit.state';
import contactsOneShow from './one/show/show.state';

function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view></div>'
    })

    .state('contacts.list', contactsList)
    .state('contacts.new', contactsNew)

    .state('contacts.one', {
      abstract: true,
      resolve: {
        contact
      },
      url: '/:id',
      template: '<div ui-view></div>'
    })

    .state('contacts.one.show', contactsOneShow)
    .state('contacts.one.edit', contactsOneEdit)

    .state('contacts.one.address', {
      abstract: true,
      template: '<div ui-view></div>',
      url: '/address'
    })

    .state('contacts.one.address.show', contactsOneAddressShow)
    .state('contacts.one.address.edit', contactsOneAddressEdit);
}
