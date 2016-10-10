function contact($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}

export const name = 'contacts.one';

export default {
  name,
  abstract: true,
  url: '/:id',
  template: '<div ui-view></div>',
  resolve: {
    contact
  }
};
