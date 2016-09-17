export default function($window) {
  'ngInject';

  return function(message) {
    return $window.confirm(message);
  };

}
