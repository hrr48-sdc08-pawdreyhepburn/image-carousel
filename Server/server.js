require('newrelic');
const express = require('express');
const app = express();


const client = require('../DB/index.js');


app.use(express.json());
const path = require('path');
const babelPolyFill = require('@babel/polyfill');
const template = require('./template.js');
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, '/../dist')));


app.get('/loaderio-*', async (req, res) => {
  res.status(200).send(req.originalUrl.slice(1, -1));
});


app.get('/:itemId', function(req, res) {
  res.send(template);
});

app.get('/products/:product/', function (req, res) {
  let id =req.params.product 
  let likeItems;
  let responseArr = []; 
    let query = {
    name: 'fetch id',  
    text: `SELECT * FROM carousel.imagecarousel WHERE id = $1`,
    values: [id]
    }
  

  client.query(query)
  .then((results) => {
    let responseObj = {};
    responseObj._id = results.rows[0].id;
    responseObj.url = results.rows[0].url;
    responseObj.color = results.rows[0].color;
    responseObj.imagename = results.rows[0].imagename;
    responseObj.alt = results.rows[0].alt;    
    likeItems = results.rows[0].relatedids.split('-');
    responseArr.push(responseObj);        
  })
  .then(() => {
    let count = 0;
    for(let i = 0; i < likeItems.length; i++) {    
      let likeObj = {};
      let likeItemQuery = {
        name: 'fetch like ids',
        text: `SELECT * FROM carousel.imagecarousel WHERE id = $1`,
        values: [`${likeItems[i]}`]
      }      
      client.query(likeItemQuery)
      .then((result) => {      
        likeObj._id = result.rows[0].id;
        likeObj.url = result.rows[0].url;
        likeObj.color = result.rows[0].color;
        likeObj.imagename = result.rows[0].imagename;
        likeObj.alt = result.rows[0].alt;
        responseArr.push(likeObj);            
        count++; 
        if(count === likeItems.length) {               
          res.setHeader('Access-Control-Allow-Origin', '*');   
          res.send(responseArr);                    
        }
      })       
      .catch((err) => {
        console.log(err);
        res.send('error fetching like IDs');
      })            
    }  
  })  
})

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


