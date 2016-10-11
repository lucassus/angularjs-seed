import angular from 'angular';
import appModule from './app.module';

export default function($document) {
  'ngInject';

  $document.ready(() => {
    angular.bootstrap('html', [appModule], {
      strictDi: true
    });
  });
}
