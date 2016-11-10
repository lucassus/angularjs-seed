import 'angular-breadcrumb';
import { alertService, confirmService } from './services';
import { appFooterComponent, appNavigationComponent } from './components';
import { appCheckmarkFilter } from './filters';
import { appUniqueEmailDirective } from './directives';
import breadcrumbTemplate from './breadcrumb.template.html';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .component('appFooter', appFooterComponent)
  .component('appNavigation', appNavigationComponent)
  .directive('appUniqueEmail', appUniqueEmailDirective)

  .service('alert', alertService)
  .service('confirm', confirmService)

  .filter('appCheckmark', appCheckmarkFilter)

  .config(($breadcrumbProvider) => {
    'ngInject';

    $breadcrumbProvider.setOptions({
      template: breadcrumbTemplate
    });
  })

  .name;
