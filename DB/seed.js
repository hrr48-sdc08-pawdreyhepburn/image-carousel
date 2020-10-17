const client = require('./index.js');
var concat = require('concat-files');

const keyspaceCarousel = 
`CREATE KEYSPACE IF NOT EXISTS Carousel
with replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
}`;

client.connect()
.then(() => {
  console.log('connected to database :')  
})
.then(() => {
  client.execute(keyspaceCarousel)
})
.then(() => {
  client.execute('use Carousel')
})
.catch((error) => {console.log(error)});