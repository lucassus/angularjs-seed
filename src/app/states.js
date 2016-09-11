import aboutTemplate from './about.html';
import contactTemplate from './contact.html';
import homeTemplate from './home/home.html';

export default function($stateProvider) {
  $stateProvider
    .state('home', {
      controller: 'HomeController as ctrl',
      template: homeTemplate,
      url: '/'
    })
    .state('about', {
      template: aboutTemplate,
      url: '/about'
    })
    .state('contact', {
      template: contactTemplate,
      url: '/contact'
    })
}
