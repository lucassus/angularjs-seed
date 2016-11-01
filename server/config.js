const { env } = process;

module.exports = Object.freeze({
  env: env['NODE_ENV'] || 'development',
  secret: env['SECRET'] || 'I am a vegan'
});
