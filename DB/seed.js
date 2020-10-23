const client = require('./index.js');

const createDB = `CREATE DATABASE carousel`;

const imageCarouselTable = 
`CREATE TABLE carousel.imageCarousel (
  id SERIAL PRIMARY KEY,
  imageid int,
  product text,
  imagename text,
  color text,
  url text,
  relatedids text,
  alt text  
)`;

client.query(createDB)
.then(() => {
  client.query(`create schema carousel`)
})
.then(() => {
  client.query(imageCarouselTable)
  console.log(`DataBase and Table created`)
})

