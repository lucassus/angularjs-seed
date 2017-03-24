import appModule from './app.module';
import commonsModule from './commons/commons.module';

export function bootstrap($document, $http, $log) {
  'ngInject';

  function fetchConfig() {
    return $http.get('/api/config')
      .then(({ data: config }) => config);
  }

  function configureApp(appConfig) {
    angular.module(commonsModule)
      .constant('appConfig', appConfig);
  }

  function bootstrapApp() {
    angular.bootstrap('html', [appModule], {
      strictDi: true
    });
  }

  $document.ready(() => {
    fetchConfig()
      .then(configureApp)
      .then(bootstrapApp)
      .catch((error) => {
        $log.error('Unable to boot the app', error);
      });
  });
}
