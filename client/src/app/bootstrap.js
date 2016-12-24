import appModule from './app.module';

export function bootstrap($document) {
  'ngInject';

  $document.ready(() => {
    angular.bootstrap('html', [appModule], {
      strictDi: true
    });
  });
}
