import contactFormComponent from './contact-form/contact-form.component';
import favouriteButtonComponent from './favourite-button/favourite-button.component';
import locationMap from './location-map/location-map.component';

export default function($compileProvider) {
  'ngInject';

  $compileProvider
    .component('appContactForm', contactFormComponent)
    .component('appFavouriteButton', favouriteButtonComponent)
    .component('appLocationMap', locationMap);
}
