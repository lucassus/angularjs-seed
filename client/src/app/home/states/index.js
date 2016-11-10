import indexState from './index/index.state';

export default function($injector) {
  'ngInject';

  $injector.invoke(indexState);
}
