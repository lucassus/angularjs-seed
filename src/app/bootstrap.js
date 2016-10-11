import angular from 'angular';
import appModule from './app.module';

export default function($document) {
  'ngInject';

  angular.element($document).ready(() => {
    angular.bootstrap($document.find('body'), [appModule], {
      strictDi: true
    });
  });
}
