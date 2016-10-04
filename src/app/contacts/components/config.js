import contactFormComponent from './contact-form/contact-form.component';
import favouriteButtonComponent from './favourite-button/favourite-button.component';

export default function($compileProvider) {
  'ngInject';

  // TODO prefix components
  $compileProvider
    .component('contactForm', contactFormComponent)
    .component('favouriteButton', favouriteButtonComponent);
}
