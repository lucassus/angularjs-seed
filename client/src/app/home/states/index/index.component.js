import template from './index.component.html';

class Controller {

  constructor(alert) {
    'ngInject';

    this.alert = alert;
    this.message = 'Hello World!';
  }

  sayHello() {
    this.alert(this.message);
  }

}

export default {
  controller: Controller,
  template
}
