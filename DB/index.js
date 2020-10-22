//BELOW FOR CASSANDRA 

// const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({ 
//   contactPoints:['127.0.0.1:9042'], 
//   credentials: {username: 'cassandra', password: 'cassandra'},
//   localDataCenter: 'datacenter1'
// });

//BELOW FOR POSTGRESQL

const { Pool, Client } = require('pg');
const client = new Client();




module.exports = client;