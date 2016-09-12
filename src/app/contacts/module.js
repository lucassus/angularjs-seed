import angular from 'angular';
import angularResource from 'angular-resource';
import contactResource from './contact_resource';
import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularResource,
  uiRouter
])
  .factory('Contact', contactResource)
  .config(states);
