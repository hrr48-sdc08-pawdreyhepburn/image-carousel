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


// added template so we can now change items based on URL
app.get('/:itemId', function(req, res) {
  res.send(template);
});

app.get('/products/:product/', function(req, res) {  
  let responseArr = [];  
  let likeItems;
  let product = req.params.product;
  let color = req.params.color;
  const query = `SELECT * from carousel.imagecarousel where id = ?`
  const params = [`${product}`];
  client.execute(query, params)
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
    let count = 1;
    for(let i = 0; i < likeItems.length; i++) {    
      let likeObj = {};
      let likeItemQuery = `select * from carousel.imagecarousel where id = ?`;
      let likeParams = [`${likeItems[i]}`];
      client.execute(likeItemQuery, likeParams)
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
});


app.get('/all/products', (req, res) => {
  const query = `select * from carousel.imagecarousel`;
  client.execute(query)
  .then((results) => {
    res.send(results)
  })
  .catch((error) => {
    console.log(error);
    res.send('error fetching all')
  })
})


app.post('/products/add/product', function (req, res) {
  let newProduct = req.body;  
  let newId;
  const query ='select * from carousel.additionstocarousel'
  client.execute(query)
  .then((result) => {
    newId = (result.rows[0].lastnumber) + 1;
  })
  .then(() => {
    const queryAdd = `insert into carousel.imagecarousel (id, alt, color, imagename, product, relatedids, url) 
    values('${newId}', '${newProduct.alt}', '${newProduct.color}', '${newProduct.imagename}', '${newProduct.product}', '${newProduct.relatedids}', '${newProduct.url}')`;
    client.execute(queryAdd)
    .then(() => {
      res.status(200).send('image received')
      const changeLast = `update carousel.additionstocarousel set lastnumber=${newId} where id=' num'`;
      client.execute(changeLast)
      .catch((error) => {
        console.log(error);
        res.send('error adding a image');
      })    
    })
  })    
});



app.delete('/products/delete/:id', function (req, res) {
  let id = req.params.id
  let deleteQuery = `delete from carousel.imagecarousel where id='${id}'`
  client.execute(deleteQuery)
    .then(() => {
      res.send('row deleted')
    })
    .catch((error) => {
      res.send('error deleting the row');
    });
})



app.put('/products/update/:id', function (req, res) {
  var id = req.params.id
  var updateThis = req.body
  Image.updateOne( {_id: id}, updateThis)
  .then(() => {res.send(updateThis)})
  .catch((error) => { res.send(error) });
})


module.exports = app;


