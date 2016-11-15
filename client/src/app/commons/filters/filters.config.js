import checkmarkFilter from './checkmark/checkmark.filter';

export default function($filterProvider) {
  'ngInject';

  $filterProvider
    .register('appCheckmark', checkmarkFilter);
}
