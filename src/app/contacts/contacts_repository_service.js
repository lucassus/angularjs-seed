import _ from 'lodash';

export default function($q) {

  const contacts = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' }
  ];

  return {

    all() {
      return $q.resolve(contacts);
    },

    find(id) {
      const contact = _.find(contacts, { id });

      if (contact) {
        return $q.resolve(contact);
      } else {
        return $q.reject('Contact not found!');
      }
    }

  }

}
