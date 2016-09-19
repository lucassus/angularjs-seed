import angular from 'angular';
import services from './services/config';

export default angular.module('app.commons', [])
  .config(services);
