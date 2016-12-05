import template from './favourite-button.component.html';

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
  template,
  bindings: {
    contact: '='
  },
  controller: Controller
};
