import 'angular-breadcrumb';
import breadcrumbTemplate from './breadcrumb.template.html';
import componentsModule from './components/components.module';
import directivesModules from './directives/directives.module';
import filtersModule from './filters/filters.module';
import servicesModule from './services/services.module';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb',

  componentsModule,
  directivesModules,
  filtersModule,
  servicesModule
])
  .config(($breadcrumbProvider) => {
    'ngInject';

    $breadcrumbProvider.setOptions({
      template: breadcrumbTemplate
    });
  })
  .name;
