import contactFactory from './contact/contact.factory';

export default function($provide) {
  'ngInject';

  $provide
    .factory('Contact', contactFactory);
}
