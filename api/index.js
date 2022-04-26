const { dbConnection } = require('./src/bd/connection')
const http = require('./src/app')
// eslint-disable-next-line no-unused-vars

require('dotenv').config()

dbConnection()

http.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor corriendo en el puerto ${process.env.SERVER_PORT}`)
})
