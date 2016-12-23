import template from './index.component.html';

class Controller {

  constructor(alert) {
    'ngInject';
    this.alert = alert;
  }

  $onInit() {
    this.message = 'Hello World!';
  }

  sayHello() {
    this.alert.show(this.message);
  }

}

export default {
  controller: Controller,
  template
};
