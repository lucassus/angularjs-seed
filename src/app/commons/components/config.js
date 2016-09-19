import footerComponent from './footer/component';
import navigationComponent from './navigation/component';

export default function($compileProvider) {
  'ngInject';
  $compileProvider.component('appFooter', footerComponent);
  $compileProvider.component('appNavigation', navigationComponent);
}
