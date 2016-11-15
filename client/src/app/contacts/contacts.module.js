import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import appCommonsModule from '../commons/commons.module';
import components from './components/components.config';
import services from './services/services.config';
import { states } from './contacts.config';
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

  .name;
