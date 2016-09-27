export default class {

  message: string;

  constructor(private alert) {
    'ngInject';

    this.message = 'Hello World!';
  }

  sayHello() {
    this.alert(this.message);
  }

}
