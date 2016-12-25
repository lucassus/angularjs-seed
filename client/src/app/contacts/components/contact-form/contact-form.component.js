import template from './contact-form.component.html';

class Controller {

  constructor($q) {
    'ngInject';
    this.$q = $q;

    this.saving = false;
  }

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
    this.saving = true;

    const { contact } = this;
    this.$q.when(this.onSubmit({ contact })).finally(() => {
      this.saving = false;
    });
  }

}

export const ContactFormComponent = {
  template,
  bindings: {
    originalContact: '=contact',
    onSubmit: '&'
  },
  controller: Controller
};
