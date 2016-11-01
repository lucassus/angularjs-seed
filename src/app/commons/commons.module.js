import 'angular-breadcrumb';
import accessTokenInterceptor from './config/http-interceptors/access-token-interceptor';
import appState from './app/app.state';
import breadcrumb from './config/breadcrumb/breadcrumb.config';
import components from './components/components.config';
import filters from './filters/filters.config';
import services from './services/services.config';
import toastr from 'angular-toastr';
import uiRouter from 'angular-ui-router';
import unauthorizedAccessInterceptor from './config/http-interceptors/unauthorized-access-interceptor';

export default angular.module('app.commons', [
  uiRouter,
  toastr,
  'ncy-angular-breadcrumb'
])
  .service('localStorage', ($window) => $window.localStorage)

  .config(components)
  .config(services)
  .config(filters)

  .config(($stateProvider) => {
    $stateProvider
      .state(appState);
  })

  .config(breadcrumb)
  .config(accessTokenInterceptor)
  .config(unauthorizedAccessInterceptor)

  .name;
