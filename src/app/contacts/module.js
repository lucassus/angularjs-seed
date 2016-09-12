import angular from 'angular';
import angularMessages from 'angular-messages';
import angularResource from 'angular-resource';
import contactFormComponent from './components/contact_form_component';
import contactResource from './services/contact_resource';
import states from './states';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter
])
  .factory('Contact', contactResource)
  .component('contactForm', contactFormComponent)
  .config(states);
