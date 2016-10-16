const db = require('../db');

module.exports = function(app) {

  app.post('/api/!seed', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendStatus(404);
    } else {
      db.seed().then(() => {
        res.sendStatus(200);
      });
    }
  });

};
