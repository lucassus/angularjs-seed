import template from './favourite_button_component.html';

// TODO write specs for the controller
// TODO separate file for the controller

class Controller {

  $onInit() {
    this.saving = false;
  }

  get favourite() {
    return this.contact.favourite;
  }

  toggleFavourite() {
    this.saving = true;

    this.contact.toggleFavourite().finally(() => {
      this.saving = false;
    });
  }

}

export default {
  bindings: {
    contact: '='
  },
  controller: Controller,
  template
};
