import 'angular-breadcrumb';
import accessTokenInterceptor from './config/http-interceptors/access-token-interceptor';
import breadcrumb from './config/breadcrumb/breadcrumb.config';
import components from './components/components.config';
import filters from './filters/filters.config';
import services from './services/services.config';
import toastr from 'angular-toastr';
import unauthorizedAccessInterceptor from './config/http-interceptors/unauthorized-access-interceptor';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .service('localStorage', ($window) => $window.localStorage)

  .config(components)
  .config(services)
  .config(filters)

  .config(breadcrumb)
  .config(accessTokenInterceptor)
  .config(unauthorizedAccessInterceptor)

  .name;
