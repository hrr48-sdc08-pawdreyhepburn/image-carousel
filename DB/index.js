const { Pool, Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: '52.53.195.166',   
  database: 'postgres', 
  password: '1',
  port: 5432
});

client.connect()
.then(() => {
  console.log('connected to database...')  
})
.catch((err) => {
  console.log(err);
})


module.exports = client;