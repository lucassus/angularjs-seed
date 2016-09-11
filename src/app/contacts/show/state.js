import controller from './controller';
import template from './template.html';

export default {
  name: 'contacts.show',

  controller,
  controllerAs: 'ctrl',

  resolve: {
    contact: function($http, $stateParams) {
      const { id } = $stateParams;
      return $http.get(`/api/contacts/${id}`)
        .then((response) => response.data)
    }
  },

  template,
  url: '/:id'
}
