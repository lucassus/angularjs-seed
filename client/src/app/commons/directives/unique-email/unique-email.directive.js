export default function($http, $parse, $q) {
  'ngInject';

  function isTaken(id, email) {
    return $http.get('/api/contacts/validate-email', { params: { id, email } })
      .then(response => response.data.taken);
  }

  return {
    restrict: 'A',
    require: 'ngModel',

    link(scope, element, attrs, ngModel) {

      ngModel.$options = ngModel.$options.createChild({
        debounce: 300,
        updateOnDefault: true
      });

      ngModel.$asyncValidators.uniqueEmail = function(modelValue) {
        if (ngModel.$isEmpty(modelValue)) {
          return $q.resolve();
        }

        const resourceId = $parse(attrs.appUniqueEmail)(scope);
        return isTaken(resourceId, modelValue).then((taken) => {
          return taken ? $q.reject() : true;
        });
      };
    }
  };
}
