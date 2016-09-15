import * as angular from 'angular';
import IComponentOptions = angular.IComponentOptions;

class Controller {

  contact: any;
  originalContact: any;
  onSubmit: Function;

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

const template = <string> require('./contact_form_component.html');

export default {
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller: Controller,
  template
};
