import _ from 'lodash';
import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.list',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contacts: function($http) {
      return $http.get('/api/contacts')
        .then((response) => _.get(response, 'data.contacts', []));
    }
  },

  template
}
