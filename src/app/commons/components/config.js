import footerComponent from './footer/component';
import navigationComponent from './navigation/component';
import uniqueEmailDirective from './unique_email/directive';

export default function($compileProvider) {
  'ngInject';

  $compileProvider
    .component('appFooter', footerComponent)
    .component('appNavigation', navigationComponent)
    .directive('appUniqueEmail', uniqueEmailDirective);
}
