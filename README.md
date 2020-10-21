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

# Connect to CassandraDB 

- Install Apache Cassandra DB 
  - You must have the latest version of Java 8 installed 

- To connect to Cassandra and initiate the keyspace and table 
  - $ npm run generateKT 

# Generate Data 
 - Once you have Cassandra and Java installed to generate data run this command in the terminal: 
   - $ npm run generateData
This will generate 5 different CSV files for you to seed into the database. 

# Seed Cassandra Database
- This seeding script depends on having dsbulk installed from datastax 
- To install dsbulk please go to this link https://docs.datastax.com/en/dsbulk/doc/dsbulk/install/dsbulkInstall.html
- If you are ready to seed the data from the previous step, please type in this command in the terminal:
 - npm run seedDB