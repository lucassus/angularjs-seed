const app = require('./app');
const db = require('./db');

const port = process.env.PORT || 9090;

db.seed().then((contacts) => {
  console.log(`Database populated with ${contacts.length} contacts`);

  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
});
