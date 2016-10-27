import appCommonsModule from '../commons/commons.module';
import { states } from './authentication.config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.authentication', [
  uiRouter,
  appCommonsModule
])
  .config(states)

  // TODO write specs
  .run(($state, $transitions, auth) => {
    $transitions.onBefore({ to: 'login' }, () => {
      if (auth.isAuthenticated()) {
        return $state.target('home');
      }
    });
  })

  .name;
