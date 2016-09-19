import angular from 'angular';
import mixin from '../../../utils/mixin';

export default function($resource) {
  'ngInject';

  function transformResponse(json) {
    const data = angular.fromJson(json);
    return data.contacts;
  }

  const Contact = $resource('/api/contacts/:id', { id: '@id' }, {
    query: { method: 'GET', isArray: true, transformResponse },
    get: { method: 'GET' },
    create: { method: 'POST' },
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });

  class ContactMixin {

    get fullName() {
      return [this.firstName, this.lastName].join(' ');
    }

    toggleFavourite() {
      const { id, favourite } = this;
      return Contact.update({ id, favourite: !favourite }).$promise
        .then((contact) => angular.extend(this, contact));
    }

  }

  return mixin(Contact, ContactMixin);
}
