import angular from 'angular';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import contactFactory from './services/contact_factory';
import contactFormComponent from './components/contact_form_component';
import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter
])
  .factory('Contact', contactFactory)
  .component('contactForm', contactFormComponent)
  .config(states);
