const client = require('./index.js');


const keyspaceCarousel = 
`CREATE KEYSPACE IF NOT EXISTS Carousel
with replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
}`;

const imageCarouselTable = 
`CREATE TABLE IF NOT EXISTS imageCarousel (
  id text PRIMARY KEY,
  product text,
  imageName text,
  color text,
  url text,
  alt text
)`;


//dsbulk load -url ./data -k carousel -t imagecarousel

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
.then(() => {
  client.execute(imageCarouselTable)
})
// .then(() => {
//   client.execute(fakeData1)
// })
.catch((error) => {console.log(error)});