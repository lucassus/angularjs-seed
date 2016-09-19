import angular from 'angular';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import appCommons from '../commons/module';
import components from './components/config';
import contactFactory from './services/contact_factory';
import states from './states/config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter,

  appCommons.name
])
  .factory('Contact', contactFactory)
  .config(components)
  .config(states);
