import angularResource from 'angular-resource';
import { contactFactory } from './contact/contact.factory';

export default angular.module('app.contacts.services', [
  angularResource
])
  .factory({ Contact: contactFactory })
  .name;
