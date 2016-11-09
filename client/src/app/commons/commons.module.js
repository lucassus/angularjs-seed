import 'angular-breadcrumb';
import { alert, confirm } from './services';
import { appFooter, appNavigation } from './components/componets';
import { appUniqueEmail } from './components/directives';
import breadcrumbTemplate from './breadcrumb.template.html';
import { checkmark } from './filters';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .component('appFooter', appFooter)
  .component('appNavigation', appNavigation)
  .directive('appUniqueEmail', appUniqueEmail)

  .service('alert', alert)
  .service('confirm', confirm)

  .filter('appCheckmark', checkmark)

  .config(($breadcrumbProvider) => {
    'ngInject';

    $breadcrumbProvider.setOptions({
      template: breadcrumbTemplate
    });
  })

  .name;
