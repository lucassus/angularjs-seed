function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

export default {
  abstract: true,
  resolve: {
    contact
  },
  url: '/:id',
  template: '<div ui-view></div>'
};
