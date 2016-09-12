import angular from 'angular';
import module from './module';

export default function($document) {
  angular.element($document).ready(() => {
    angular.bootstrap($document, [module.name], {
      strictDi: false
    });
  });
}
