import * as angular from 'angular';
import { IContact } from '../services/contact_factory';

class Controller {

  contact: IContact;
  originalContact: IContact;
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
