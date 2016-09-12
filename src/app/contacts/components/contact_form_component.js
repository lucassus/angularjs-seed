import angular from 'angular';
import template from './contact_form_component.html';

class Controller {

  $onInit() {
    this.contact = angular.copy(this.originalContact);
  }

  showError(form, field) {
    return form.$dirty && form[field].$invalid;
  }

  isPersisted() {
    return Boolean(this.contact.id);
  }

  submit() {
    this.onSubmit({ contact: this.contact });
  }

}

export default {
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller: Controller,
  template
};
