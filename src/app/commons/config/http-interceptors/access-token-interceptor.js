export default function($httpProvider) {
  'ngInject';

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
      }
    };
  });

}
