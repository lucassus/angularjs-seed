import { oneResolver } from '../services/contact/contact.resolvers';

export const name = 'contacts.one';

export default {
  name,
  abstract: true,
  url: '/:id',
  template: '<div ui-view></div>',
  resolve: {
    contact: oneResolver
  }
};
