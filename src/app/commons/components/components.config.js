import footerComponent from './footer/footer.component';
import navigationComponent from './navigation/navigation.component';
import uniqueEmailDirective from './unique-email/unique-email.directive';

export default function($compileProvider) {
  'ngInject';

  $compileProvider
    .component('appFooter', footerComponent)
    .component('appNavigation', navigationComponent)
    .directive('appUniqueEmail', uniqueEmailDirective);
}
