import * as angular from 'angular';
import * as sinon from 'sinon';
import * as toastr from 'angular-toastr';

export default angular.module('toastr.mock', [toastr]).decorator('toastr', ($delegate) => {
  return sinon.stub($delegate);
}).name;
