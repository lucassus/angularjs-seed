module.exports = Object.freeze({
  env: process.env.NODE_ENV || 'development',
  secret: process.env.SECRET || 'I am a vegan'
});
