import contactFormComponent from './contact-form/contact-form.component';
import favouriteButtonComponent from './favourite-button/favourite-button.component';

export default function($compileProvider) {
  'ngInject';

  $compileProvider
    .component('appContactForm', contactFormComponent)
    .component('appFavouriteButton', favouriteButtonComponent);
}
