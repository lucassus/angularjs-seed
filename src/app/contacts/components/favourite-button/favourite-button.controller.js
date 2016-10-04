export default class {

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
