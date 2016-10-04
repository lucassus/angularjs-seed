import _ from 'lodash';

export default function($http, $parse, $q) {
  'ngInject';

  function isTaken(id, email) {
    return $http.get('/api/contacts/validate-email', { params: { id, email } })
      .then(response => _.get(response, 'data.taken'));
  }

  return {
    restrict: 'A',
    require: 'ngModel',

    link: function(scope, element, attrs, ngModel) {
      ngModel.$options = ngModel.$options || {};

      angular.extend(ngModel.$options, {
        debounce: 300,
        updateOnDefault: true
      });

      ngModel.$asyncValidators.uniqueEmail = function(modelValue) {
        if (ngModel.$isEmpty(modelValue)) {
          return $q.resolve();
        }

        const id = _.get($parse(attrs.appUniqueEmail)(scope), 'id');
        return isTaken(id, modelValue).then((taken) => {
          return taken ? $q.reject() : true;
        });
      };
    }
  };
}
