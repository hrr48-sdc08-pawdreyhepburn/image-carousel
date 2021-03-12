require('newrelic');
const express = require('express');
const app = express();
const client = require('../DB/index.js');
app.use(express.json());
const path = require('path');
const babelPolyFill = require('@babel/polyfill');
const cors = require('cors');

app.use(cors());
app.use('/', express.static(path.join(__dirname, '/../dist')));
app.use('/:itemId', express.static(path.join(__dirname, '/../dist')));


app.get('/loaderio-*', async (req, res) => {
  res.status(200).send(req.originalUrl.slice(1, -1));
});

app.get('/products/:product/', function (req, res) {
  let id =req.params.product 
  let query = {
    name: 'fetch id',  
    text: `SELECT * FROM carousel.imagecarousel WHERE product_id = $1`,
    values: [id]
  }  
  client.query(query)
  .then((results) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.send(results.rows)         
  }) 
  .catch((err) => {
    console.log(err);
    res.send('error fetching like IDs');
  })            
});  
 

app.post('/products/add/product', function (req, res) {
  let newProduct = req.body;  
  let newId;
  const query ='select * from carousel.additions'
  client.query(query)
  .then((result) => {
    newId = (result.rows[0].lastnumber) + 1;
  })
  .then(() => {
    const queryAdd = `INSERT INTO carousel.imagecarousel (imageid, alt, color, imagename, product, relatedids, url) 
    values('${newId}', '${newProduct.alt}', '${newProduct.color}', '${newProduct.imagename}', '${newProduct.product}', '${newProduct.relatedids}', '${newProduct.url}')`;
    client.query(queryAdd)
    .then(() => {
      res.status(200).send('image received')
      const changeLast = `update carousel.additions set lastnumber=${newId} where id=1`;
      client.query(changeLast)
      .catch((error) => {
        console.log(error);
        res.send('error adding a image');
      })    
    })
  })    
});




module.exports = app;


