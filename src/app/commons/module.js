import angular from 'angular';
import confirmService from './services/confirm_service';

export default angular.module('app.commons', [])
  .service('confirm', confirmService);
