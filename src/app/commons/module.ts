import * as angular from 'angular';
import * as toastr from 'angular-toastr';
import components from './components/config';
import services from './services/config';

export default angular.module('app.commons', [
  toastr
])
  .config(components)
  .config(services)
  .name;
