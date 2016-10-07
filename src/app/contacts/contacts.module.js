import addressStates from './@address/address.states';
import angular from 'angular';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import appCommonsModule from '../commons/commons.module';
import components from './components/components.config';
import services from './services/services.config';
import states from './contacts.states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter,

  appCommonsModule
])
  .config(services)
  .config(components)
  .config(states)
  .config(addressStates)
  .name;
