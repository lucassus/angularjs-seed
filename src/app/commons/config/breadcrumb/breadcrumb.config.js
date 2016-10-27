import template from './breadcrumb.template.html';

export default function($breadcrumbProvider) {
  'ngInject';

  $breadcrumbProvider.setOptions({
    template
  });
}
