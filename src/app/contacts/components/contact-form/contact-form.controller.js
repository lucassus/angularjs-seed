import angular from 'angular';

export default class {

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
