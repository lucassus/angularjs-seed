import alert from './alert/alert.service';
import confirm from './confirm/confirm.service';

export default function($provide) {
  'ngInject';

  $provide.service('alert', alert);
  $provide.service('confirm', confirm);
}
