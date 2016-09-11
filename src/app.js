import 'babel-polyfill';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';
import AppController from './app/app_controller';
import angular from 'angular';

export default angular.module('seed', [])
  .controller('AppController', AppController);
