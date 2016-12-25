import componentsModule from './components/components.module';
import servicesName from './services/services.module';
import statesModule from './states/states.module';

export default angular.module('app.contacts', [
  componentsModule,
  servicesName,
  statesModule
])
  .name;
