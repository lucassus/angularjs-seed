import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './style.scss';

import angular from 'angular';
import bootstrap from './bootstrap';

angular.injector(['ng'])
  .invoke(bootstrap);
