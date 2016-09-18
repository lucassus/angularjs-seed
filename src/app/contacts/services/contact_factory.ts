import mixin from '../../utils/mixin';

export interface IContact extends ng.resource.IResource<IContact> {
  id: number;
  firstName: string;
  lastName: string;
  favourite: boolean;

  fullName: string;

  toggleFavourite(): Promise<IContact>;
}

export interface IContactClass extends ng.resource.IResourceClass<IContact> {

}

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

    id: number;
    firstName: string;
    lastName: string;
    favourite: boolean;

    get fullName(): string {
      return [this.firstName, this.lastName].join(' ');
    }

    toggleFavourite(): Promise<IContact> {
      const { id, favourite } = this;
      return Contact.update({ id, favourite: !favourite }).$promise
        .then((contact) => angular.extend(this, contact));
    }

  }

  return mixin(Contact, ContactMixin);
}
