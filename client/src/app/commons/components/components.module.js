import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';

export default angular.module('app.commons.components', [])
  .component('appFooter', FooterComponent)
  .component('appNavigation', NavigationComponent)
  .name;
