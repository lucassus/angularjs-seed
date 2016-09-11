import 'babel-polyfill';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';
import * as states from './app/states';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

export default angular.module('seed', [uiRouter])
  .config(states.about)
  .config(states.contacts)
  .config(states.home);
