import confirm from './confirm/service';

export default function($provide) {
  'ngInject';

  $provide
    .service('confirm', confirm);
}
