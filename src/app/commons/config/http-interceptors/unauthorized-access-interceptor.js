export default function($httpProvider) {
  'ngInject';

  const HTTP_UNAUTHORIZED = 401;

  $httpProvider.interceptors.push(($injector, $q, $state, session) => {
    return {
      responseError(rejection) {
        if (rejection.status === HTTP_UNAUTHORIZED) {
          // Workaround for circular dependency (toastr <- $http)
          const toastr = $injector.get('toastr');
          toastr.error('Unauthorized');

          session.removeToken();
          $state.go('login');
        }

        return $q.reject(rejection);
      }
    };
  });

}
