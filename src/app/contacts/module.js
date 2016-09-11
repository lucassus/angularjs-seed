import angular from 'angular';
import contactsRepositoryService from './contacts_repository_service';
import state from './state';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [uiRouter])
  .service('contactsRepository', contactsRepositoryService)
  .config(state);
