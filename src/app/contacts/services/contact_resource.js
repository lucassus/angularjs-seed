function transformResponse(json) {
  var data = angular.fromJson(json);
  return data.contacts;
}

export default function($resource) {
  return $resource('/api/contacts/:id', { id: '@id' }, {
    query: { method: 'GET', isArray: true, transformResponse },
    get: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });
}

export function resolveContact($stateParams, Contact) {
  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}
