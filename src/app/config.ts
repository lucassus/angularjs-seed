export function router($urlMatcherFactoryProvider, $urlRouterProvider) {
  'ngInject';

  $urlMatcherFactoryProvider.strictMode(true);
  $urlRouterProvider.when('', '/');
}

export function notFoundState($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('404', {
      template: require('./404.html')
    });

  $urlRouterProvider.otherwise(($injector) => {
    $injector.get('$state').go('404');
  });
}
