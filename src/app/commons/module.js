import angular from 'angular';
import components from './components/config';
import services from './services/config';

export default angular.module('app.commons', [])
  .config(components)
  .config(services)
  .name;
