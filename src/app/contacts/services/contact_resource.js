function transformResponse(json) {
  const data = angular.fromJson(json);
  return data.contacts;
}

export default function($resource) {
  const Resource = $resource('/api/contacts/:id', { id: '@id' }, {
    query: { method: 'GET', isArray: true, transformResponse },
    get: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });

  class Contact extends Resource {

  }

  return Contact;
}

export function resolveContact($stateParams, Contact) {
  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}
