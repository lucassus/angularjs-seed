import 'babel-polyfill';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';
import HomeController from './app/home/home_controller';
import angular from 'angular';
import states from './app/states';
import uiRouter from 'angular-ui-router';

export default angular.module('seed', [uiRouter])
  .config(states)
  .controller('HomeController', HomeController);
