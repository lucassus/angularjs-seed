// TODO better naming convention for interceptors
export default function($httpProvider) {
  'ngInject';

  const HTTP_UNAUTHORIZED = 401;

  $httpProvider.interceptors.push(($injector, $q, session) => {
    return {
      request(config) {
        const token = session.getToken();

        if (token) {
          angular.extend(config.headers, {
            'x-access-token': token
          });
        }

        return config;
      },

      responseError(rejection) {
        if (rejection.status === HTTP_UNAUTHORIZED) {
          // Workaround for circular dependency (toastr <- $http)
          const toastr = $injector.get('toastr');
          toastr.error('Unauthorized');

          session.removeToken();
        }

        return $q.reject(rejection);
      }
    };
  });

}
