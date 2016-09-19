import contactFactory from './contact/factory';

export default function($provide) {
  'ngInject';

  $provide
    .factory('Contact', contactFactory);
}
