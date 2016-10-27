export default function(localStorage) {
  'ngInject';

  const TOKEN = 'token';

  return {
    setToken(token) {
      localStorage.setItem(TOKEN, token);
    },

    getToken() {
      return localStorage.getItem(TOKEN);
    },

    removeToken() {
      localStorage.removeItem(TOKEN);
    }
  };

}
