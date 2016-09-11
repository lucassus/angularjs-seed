import 'babel-polyfill';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';
import * as modules from './modules';
import angular from 'angular';

export default angular.module('app', [
  modules.about.name,
  modules.contacts.name,
  modules.home.name,
]);
