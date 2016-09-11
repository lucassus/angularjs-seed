import 'babel-polyfill';
import angular from 'angular';

import AppController from './app/app_controller';

angular.module('seed', [])
  .controller('AppController', AppController);
