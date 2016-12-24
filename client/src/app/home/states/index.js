import { indexState } from './index/index.state';

export function states($injector) {
  'ngInject';
  $injector.invoke(indexState);
}
