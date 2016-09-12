import angular from 'angular';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import contactResource from './contact_resource';
import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter
])
  .factory('Contact', contactResource)
  .config(states);
