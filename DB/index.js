const { Pool, Client } = require('pg');
const client = new Client({  
  host: 'localhost',   
});

client.connect()
.then(() => {
  console.log('connected to database...')  
})
.catch((err) => {
  console.log(err);
})


module.exports = client;