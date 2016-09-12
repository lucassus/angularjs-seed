import angular from 'angular';
import module from './module';

export default function($document) {
  'ngInject';

  angular.element($document).ready(() => {
    angular.bootstrap($document, [module.name], {
      strictDi: true
    });
  });
}
