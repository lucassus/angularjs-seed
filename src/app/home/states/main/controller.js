export default class {

  constructor(alert) {
    'ngInject';

    this.alert = alert;
    this.message = 'Hello World!';
  }

  sayHello() {
    this.alert(this.message);
  }

}
