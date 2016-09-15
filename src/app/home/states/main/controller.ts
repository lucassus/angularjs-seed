export default class {

  message: string;

  constructor(private $window: ng.IWindowService) {
    'ngInject';

    this.message = 'Hello World!';
  }

  sayHello() {
    this.$window.alert(this.message);
  }

}
