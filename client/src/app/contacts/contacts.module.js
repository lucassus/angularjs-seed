import { contactFormComponent, favouriteButtonComponent } from './components';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import appCommonsModule from '../commons/commons.module';
import { contactFactory } from './services';
import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter,

  appCommonsModule
])
  .factory('Contact', contactFactory)

  .component('appContactForm', contactFormComponent)
  .component('appFavouriteButton', favouriteButtonComponent)

  .config(states)

  .name;
