import alert from './alert/service';
import confirm from './confirm/service';

export default function($provide) {
  'ngInject';

  $provide.service('alert', alert);
  $provide.service('confirm', confirm);
}
