import { ContactFormComponent } from './contact-form/contact-form.component';
import { FavouriteButtonComponent } from './favourite-button/favourite-button.component';
import servicesModule from '../services/services.module';

export default angular.module('app.contacts.components', [
  servicesModule
])
  .component('appContactForm', ContactFormComponent)
  .component('appFavouriteButton', FavouriteButtonComponent)
  .name;
