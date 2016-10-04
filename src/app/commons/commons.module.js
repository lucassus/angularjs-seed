import angular from 'angular';
import components from './components/config';
import services from './services/config';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr
])
  .config(components)
  .config(services)
  .name;
