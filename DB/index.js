const { Pool, Client } = require('pg');
const client = new Client();

client.connect()
.then(() => {
  console.log('connected to database...')
})


module.exports = client;