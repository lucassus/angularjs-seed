import 'angular-breadcrumb';
import { AlertService, ConfirmationService } from './services';
import { FooterComponent, NavigationComponent } from './components';
import { UniqueEmailDirective } from './directives';
import { appCheckmark } from './filters';
import breadcrumbTemplate from './breadcrumb.template.html';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .component('appFooter', FooterComponent)
  .component('appNavigation', NavigationComponent)

  .directive({
    appUniqueEmail: UniqueEmailDirective
  })

  .service({
    alert: AlertService,
    confirmation: ConfirmationService
  })

  .filter({
    appCheckmark
  })

  .config(($breadcrumbProvider) => {
    'ngInject';

    $breadcrumbProvider.setOptions({
      template: breadcrumbTemplate
    });
  })

  .name;
