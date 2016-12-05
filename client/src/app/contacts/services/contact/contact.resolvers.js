export function listResolver(Contact) {
  'ngInject';
  return Contact.query().$promise;
}

export function oneResolver($stateParams, Contact) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}
