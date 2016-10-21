import alert from './alert/alert.service';
import auth from './auth/auth.service';
import confirm from './confirm/confirm.service';
import session from './session/session.service';

export default function($provide) {
  'ngInject';

  $provide.service('alert', alert);
  $provide.service('auth', auth);
  $provide.service('confirm', confirm);
  $provide.service('session', session);
}
