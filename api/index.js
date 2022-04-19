const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Sincronizar todos los modelos a la vez
conn.sync({ force:false}).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});