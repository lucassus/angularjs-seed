import 'babel-polyfill';
import angular from 'angular';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';

import AppController from './app/app_controller';

export default angular.module('seed', [])
  .controller('AppController', AppController);
