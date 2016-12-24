import { appCheckmark } from './checkmark/checkmark.filter';

export default angular.module('app.commons.filters', [])
  .filter({ appCheckmark })
  .name;
