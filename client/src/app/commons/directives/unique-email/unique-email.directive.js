export function appUniqueEmail($http, $parse, $q) {
  'ngInject';

  function isTaken(id, email) {
    return $http.get('/api/contacts/validate-email', { params: { id, email } })
      .then(({ data }) => data.taken);
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

        const id = $parse(attrs.appUniqueEmail)(scope);

        return isTaken(id, modelValue).then((taken) => {
          return taken ? $q.reject() : true;
        });
      };
    }
  };
}
