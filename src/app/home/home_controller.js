export default class {

  constructor($window) {
    this.$window = $window;

    this.message = 'Hello World!';
  }

  sayHello() {
    this.$window.alert(this.message);
  }

}
