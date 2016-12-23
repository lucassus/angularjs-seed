import 'angular-breadcrumb';
import { alertService, confirmService } from './services';
import { FooterComponent, NavigationComponent } from './components';
import { checkmarkFilter } from './filters';
import { UniqueEmailDirective } from './directives';
import breadcrumbTemplate from './breadcrumb.template.html';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .component('appFooter', FooterComponent)
  .component('appNavigation', NavigationComponent)
  .directive('appUniqueEmail', UniqueEmailDirective)

  .service('alert', alertService)
  .service('confirm', confirmService)

  .filter('appCheckmark', checkmarkFilter)

  .config(($breadcrumbProvider) => {
    'ngInject';

    $breadcrumbProvider.setOptions({
      template: breadcrumbTemplate
    });
  })

  .name;
