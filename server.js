const app = require('./server/app');
const db = require('./server/db');

db.seed().then((contacts) => {
  console.log(`Database populated with ${contacts.length} contacts`);

  const port = process.env.PORT || 9090;
  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
});
