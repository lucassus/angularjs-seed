import './style.scss';

import angular from 'angular';
import bootstrap from './app/bootstrap';

angular.injector(['ng'])
  .invoke(bootstrap);
