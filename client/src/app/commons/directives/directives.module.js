import { appUniqueEmail } from './unique-email/unique-email.directive';

export default angular.module('app.common.directives', [])
  .directive({ appUniqueEmail })
  .name;
