import 'angular-breadcrumb';
import breadcrumb from './config/breadcrumb.config';
import components from './components/components.config';
import filters from './filters/filters.config';
import httpAuthInterceptor from './config/http-auth-interceptor';
import services from './services/services.config';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .service('localStorage', ($window) => $window.localStorage)

  .config(components)
  .config(services)
  .config(filters)

  .config(breadcrumb)
  .config(httpAuthInterceptor)

  .name;
