import template404 from './404.html';

export function router($urlMatcherFactoryProvider, $urlRouterProvider) {
  'ngInject';

  $urlMatcherFactoryProvider.strictMode(true);
  $urlRouterProvider.when('', '/');
}

export function notFoundState($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('404', {
      template: template404
    });

  $urlRouterProvider.otherwise(($injector) => {
    $injector.get('$state').go('404');
  });
}

export function html5Mode($locationProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
}

export function anchorScroll($uiViewScrollProvider) {
  'ngInject';
  $uiViewScrollProvider.useAnchorScroll();
}
