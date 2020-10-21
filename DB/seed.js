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
  imagename text,
  color text,
  url text,
  relatedids text,
  alt text
)`;

const additionsToCarousel =
`CREATE TABLE IF NOT EXISTS additionsToCarousel (
  id text PRIMARY KEY,
  lastnumber int
)` 

client.connect()
.then(() => {  
  console.log('connected to database :')  
})
.then(() => {
  client.execute(keyspaceCarousel)
  .then(() => {
    client.execute('use carousel')
    .then(() => {
      client.execute(imageCarouselTable)
      .then(() => {
        client.execute(additionsToCarousel)      
        .catch((error) => {
          console.log(error);
        })
      })
    })
  })
})




// client.connect()
// .then(() => {  
//   console.log('connected to database :')  
// .then(() => {
//   client.execute(keyspaceCarousel)
// }).then(() => {
//   client.execute('use carousel;')
// }).then(() => {
//   client.execute(imageCarouselTable)
// })
// .catch((error) => {console.log(error)});
