import { AlertService } from './alert/alert.service';
import { ConfirmationService } from './confirmation/confirmation.service';

export default angular.module('app.commons.services', [])
  .service({
    alert: AlertService,
    confirmation: ConfirmationService
  })
  .name;
