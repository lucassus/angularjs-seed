import 'babel-polyfill';
import angular from 'angular';

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import AppController from './app/app_controller';

export default angular.module('seed', [])
  .controller('AppController', AppController);
