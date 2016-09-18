import { IContact } from '../../services/contact_factory';

export default class {

  contacts: Array<IContact>;

  constructor(contacts) {
    'ngInject';

    this.contacts = contacts;
  }

}
