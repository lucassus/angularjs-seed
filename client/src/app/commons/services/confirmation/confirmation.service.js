export class ConfirmationService {

  constructor($window) {
    'ngInject';
    this.$window = $window;
  }

  show(message) {
    return this.$window.confirm(message);
  }

}
