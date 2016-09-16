function transformResponse(json) {
  const data = angular.fromJson(json);
  return data.contacts;
}

export default function($resource) {
  'ngInject';

  const Contact = $resource('/api/contacts/:id', { id: '@id' }, {
    query: { method: 'GET', isArray: true, transformResponse },
    get: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });

  // TODO use es6 style

  Object.defineProperty(Contact.prototype, 'fullName', {
    get() {
      return [this.firstName, this.lastName].join(' ');
    }
  });

  return Contact;
}
