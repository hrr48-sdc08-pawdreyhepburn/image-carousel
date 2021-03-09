const client = require('./index.js');

const createDB = `CREATE DATABASE carousel`;

const product = 
`CREATE TABLE carousel.products (
  id SERIAL PRIMARY KEY
)`

const imageCarouselTable = 
`CREATE TABLE carousel.imageCarousel (
  id SERIAL PRIMARY KEY,
  productid int FOREIGN KEY,  
  imagename text,
  color text,
  url text,
  relatedids text,
  alt text  
)`;

const additionsToCarousel =
`CREATE TABLE carousel.additions (
  id SERIAL PRIMARY KEY,
  lastnumber int
)`

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
  client.query(additionsToCarousel)
  console.log(`DataBase and Table created`)
})
.catch((error) => {
  console.log(error);
})
