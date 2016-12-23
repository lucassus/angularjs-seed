import { ContactFormComponent, FavouriteButtonComponent } from './components';
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

  .component('appContactForm', ContactFormComponent)
  .component('appFavouriteButton', FavouriteButtonComponent)

  .config(states)

  .name;
