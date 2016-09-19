import sinon from 'sinon';
import toastr from 'angular-toastr';

export default angular.module('toastr.mock', [toastr]).decorator('toastr', ($delegate) => {
  return sinon.stub($delegate);
}).name;
