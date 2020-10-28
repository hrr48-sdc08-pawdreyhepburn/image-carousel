const client = require('./index.js');
const { performance } = require('perf_hooks');

// let loadCsv1 = \COPY carousel.imagecarousel(imageid, alt, color, imagename, product, relatedids, url) FROM '/Users/scott/git_repos/image_carousel/data/testData5.csv' DELIMITER ',' CSV HEADER
let loadCsv2 = `\\COPY carousel.imagecarousel(imageid, alt, color, imagename, product, relatedids, url) FROM '${__dirname}/data/testData2.csv' DELIMITER ',' CSV HEADER`;
let loadCsv3 = `\\COPY carousel.imagecarousel(imageid, alt, color, imagename, product, relatedids, url) FROM '${__dirname}/data/testData3.csv' DELIMITER ',' CSV HEADER`;
let loadCsv4 = `\\COPY carousel.imagecarousel(imageid, alt, color, imagename, product, relatedids, url) FROM '${__dirname}/data/testData4.csv' DELIMITER ',' CSV HEADER`;
let loadCsv5 = `\\COPY carousel.imagecarousel(imageid, alt, color, imagename, product, relatedids, url) FROM '${__dirname}/data/testData5.csv' DELIMITER ',' CSV HEADER`;
let lastNum = `INSERT INTO carousel.additions(lastnumber) VALUES(10000000)`;

let time1 = performance.now()
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
          client.query(lastNum)
          let time2 = performance.now();
          console.log(`it took ${time2 - time1} milliseconds to load all data`);
        })
        .catch((error) => {
          console.log(error);
        })
      })
    })
  })
})
