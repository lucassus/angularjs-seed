import 'angular-breadcrumb';
import breadcrumbTemplate from './breadcrumb.template.html';
import components from './components/components.config';
import filters from './filters/filters.config';
import services from './services/services.config';
import toastr from 'angular-toastr';

export default angular.module('app.commons', [
  toastr,
  'ncy-angular-breadcrumb'
])
  .config(components)
  .config(services)
  .config(filters)

  .config(($breadcrumbProvider) => {
    'ngInject';

    $breadcrumbProvider.setOptions({
      template: breadcrumbTemplate
    });
  })

  .name;
