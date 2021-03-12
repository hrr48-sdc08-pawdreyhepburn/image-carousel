const client = require('./index.js');

const createDB = `CREATE DATABASE carousel`;

const product = 
`CREATE TABLE carousel.products (
  id SERIAL PRIMARY KEY
)`

const imageCarouselTable = 
`CREATE TABLE carousel.imageCarousel (
  _id SERIAL,
  product_id int,  
  imagename text,
  color text,
  url text,  
  alt text,
  PRIMARY KEY(_id)      
)`;




client.query(createDB)
.then(() => {
  client.query(`create schema carousel`)
})
.then(() => {
  client.query(product)  
})
.then(() => {
  client.query(imageCarouselTable)
})
.then(() => {  
  console.log(`DataBase and Table created`)
})
.catch((error) => {
  console.log(error);
})
