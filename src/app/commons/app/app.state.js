import template from './app.state.html';

export const name = 'app';

// TODO find better place / solution / research 1.0.0 API
export default {
  name,
  template,
  abstract: true,

  data: {
    publicState: false
  }
};
