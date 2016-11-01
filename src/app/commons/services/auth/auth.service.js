export default function($http, session) {
  'ngInject';

  return {

    isAuthenticated() {
      return Boolean(session.getToken());
    },

    authenticate({ email, password }) {
      return $http.post('/api/authentication', { email, password }).then((response) => {
        const { token } = response.data;
        session.setToken(token);
      });
    },

    logout() {
      session.removeToken();
    }

  };

}
