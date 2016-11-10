import { oneResolver } from '../../services/contact/contact.resolvers';

export default function($stateProvider) {
  'ngInject';

  $stateProvider.state('contacts.one', {
    abstract: true,
    url: '/:id',
    template: '<div ui-view autoscroll="true"></div>',
    resolve: {
      contact: oneResolver
    }
  });

}
