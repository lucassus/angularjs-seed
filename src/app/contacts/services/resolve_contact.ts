import { IContactClass } from './contact_factory';

export default function($stateParams, Contact: IContactClass) {
  'ngInject';

  const { id } = $stateParams;
  return Contact.get({ id }).$promise;
}
