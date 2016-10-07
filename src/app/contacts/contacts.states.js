// TODO `require` is weird
// TODO this patterns works fine with Idea navigation

export default function($stateProvider) {
  'ngInject';

  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view></div>'
    })

    .state('contacts.list', require('./list/list.state').default)
    .state('contacts.new', require('./new/new.state').default)

    .state('contacts.one', require('./one/one.state').default)
    .state('contacts.one.show', require('./one/show/show.state').default)
    .state('contacts.one.edit', require('./one/edit/edit.state').default)

    .state('contacts.one.address', require('./one/address/address.states').default)
    .state('contacts.one.address.show', require('./one/address/show/show.state').default)
    .state('contacts.one.address.edit', require('./one/address/edit/edit.state').default);
}
