# Carousel
Image Carousel

# Setup :

In order to get setup run the following scripts:

1) Install Dependencies: npm install

2) Seeding Script:
  - open mongo instance in terminal: mongo
  - choose database: use carousel
  - clear collection: db.images.remove({})
  - in a seperate terminal: npm run dbSetup

3) Server Start Script: npm start

4) Webpack Script: npm run build

5) Carousel should be rendered to DOM


Testing Script: npm test

Have Fun!


# CRUD Endpoints :

# Legacy Endpoints 

- Get : '/products/:product/'
  - serves data depending on the product number (0 - 100) currently

# Endpoints added by Scott Mounce 

- Get : '/:itemId' 
  - serves a template html page

- Post : 'products/add/product'
  - adds a product via req.body then serves the total data with the added data back to the client 

- Delete : '/products/delete/:id'     
  - deletes a product with a matching id number 

- Put : '/products/update/:id'
  - updates a product with a matching id number, the update will be contained in the req.body   

