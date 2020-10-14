const express = require('express');
const app = express();
const Image = require('../DB/image.js')
const bodyParser = require('body-parser')
app.use(express.json());
const path = require('path');
const babelPolyFill = require('@babel/polyfill');
const template = require('./template.js');

app.use(express.static(path.join(__dirname, '/../dist')));

// below doesn't do anything 

// app.get('/', (req, res) => {
//   // res.end('Baby Steps!')  
// })

//below doesn't do anything 

// app.get('/products', function(req, res) {
//   Image.find({}, function(err, result) {
//     if (err) {
//     throw err;
//   } else {
//     res.send(result);
//   }
//   })
// });


// added template so we can now change items based on URL
app.get('/:itemId', function(req, res) {
  res.send(template);
});

app.get('/products/:product/', function(req, res) {  
  var productParam = req.params.product;
  var colorParam = req.params.color;
  Image.find({
      product: productParam
}, function(err, result) {
    if (err) {
    throw err;
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(result);
  }
  });

app.post('/products/add/product', function (req, res) {
  newProduct = req.body;  
  Image.create(newProduct) 
    .then(() => {Image.find({}).then((results) => {res.send(results)})})   
    .catch((error) => {res.send(error)})
});

app.delete('/products/delete/:id', function (req, res) {
  var id = req.params.id
  Image.deleteOne( {_id: id}, (error) => { res.send(error) } )
})

app.put('/products/update/:id', function (req, res) {
  var id = req.params.id
  var updateThis = req.body
  Image.updateOne( {_id: id}, updateThis)
  .then(() => {res.send(updatThis)})
  .catch((error) => { res.send(error) });
})





});


module.exports = app;


