function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

export default {
  abstract: true,
  template: '<div ui-view></div>',
  resolve: {
    contact
  }
};
