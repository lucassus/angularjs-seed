export class AlertService {

  constructor($window) {
    'ngInject';
    this.$window = $window;
  }

  show(message) {
    return this.$window.alert(message);
  }

}
