import 'babel-polyfill';
import angular from 'angular';

import AppController from './app/app_controller';

export default angular.module('seed', [])
  .controller('AppController', AppController);
