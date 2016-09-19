import contactForm from './contact_form/component';
import favouriteButton from './favourite_button/component';

export default function($compileProvider) {
  'ngInject';

  $compileProvider
    .component('contactForm', contactForm)
    .component('favouriteButton', favouriteButton);
}
