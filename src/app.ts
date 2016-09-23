/// <reference path="./typings/angular-loading-bar.d.ts" />
/// <reference path="./typings/angular-messages.d.ts" />
/// <reference path="./typings/angular-toastr.d.ts" />
/// <reference path="./typings/require.d.ts" />

import './style.scss';

import * as angular from 'angular';
import bootstrap from './app/bootstrap';

angular.injector(['ng'])
  .invoke(bootstrap);
