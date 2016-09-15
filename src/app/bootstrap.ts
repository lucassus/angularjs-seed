import * as angular from 'angular';
import module from './module';

export default function($document: JQuery) {
  'ngInject';

  angular.element($document).ready(() => {
    angular.bootstrap($document.find('body'), [module.name], {
      strictDi: true
    });
  });
}
