const client = require('./index.js');
const { performance } = require('perf_hooks');

let loadCsv6 = `COPY carousel.products(id) from '/Users/scott/git_repos/image_carousel/data/testData6.csv' CSV;`
let loadCsv1 = `COPY carousel.imagecarousel(_id, product_id, imagename, color, url, alt) FROM '/Users/scott/git_repos/image_carousel/data/testData1.csv' DELIMITER ',' CSV HEADER;`
let loadCsv2 = `COPY carousel.imagecarousel(_id, product_id, imagename, color, url, alt) FROM '/Users/scott/git_repos/image_carousel/data/testData2.csv' DELIMITER ',' CSV HEADER;`;
let loadCsv3 = `COPY carousel.imagecarousel(_id, product_id, imagename, color, url, alt) FROM '/Users/scott/git_repos/image_carousel/data/testData3.csv' DELIMITER ',' CSV HEADER;`;
let loadCsv4 = `COPY carousel.imagecarousel(_id, product_id, imagename, color, url, alt) FROM '/Users/scott/git_repos/image_carousel/data/testData4.csv' DELIMITER ',' CSV HEADER;`;
let loadCsv5 = `COPY carousel.imagecarousel(_id, product_id, imagename, color, url, alt) FROM '/Users/scott/git_repos/image_carousel/data/testData5.csv' DELIMITER ',' CSV HEADER;`;
let foreign = `ALTER TABLE carousel.imageCarousel add foreign key (product_id) references carousel.products (id);`;

let time1 = performance.now()
client.query(loadCsv6)
.then(() => {
  client.query(loadCsv1)
  .then(() => {
    client.query(loadCsv2)
    .then(() => {
      client.query(loadCsv3)
      .then(() => {
        client.query(loadCsv4)
        .then(() => {
          client.query(loadCsv5)
          .then(() => {
            client.query(foreign)
            .then(() => {          
              let time2 = performance.now();
              console.log(`it took ${time2 - time1} milliseconds to load all data`);
            })
          })
        })
        .catch((error) => {
          console.log(error);
        })
      })
    })
  })
})

