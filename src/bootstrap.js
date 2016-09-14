import angular from 'angular';
import module from './app/module';

export default function($document) {
  'ngInject';

  angular.element($document).ready(() => {
    angular.bootstrap($document.find('body'), [module.name], {
      strictDi: true
    });
  });
}
