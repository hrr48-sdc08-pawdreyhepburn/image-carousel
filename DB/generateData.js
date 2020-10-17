const faker = require('faker');
const { Worker, isMainThread } = require('worker_threads');
const { performance } = require('perf_hooks');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;



if(isMainThread) {  
    let work1 = new Worker(__filename);
    let work2 = new Worker(__filename);
    let work3 = new Worker(__filename);
    let work4 = new Worker(__filename);
    let work5 = new Worker(__filename);    
  // let work6 = new Worker(__filename);
  // let work7 = new Worker(__filename);
  // let work8 = new Worker(__filename);
  // let work9 = new Worker(__filename);
  // let work10 = new Worker(__filename);
  // let work11 = new Worker(__filename);
  // let work12 = new Worker(__filename);
  // let work13 = new Worker(__filename);
  // let work14 = new Worker(__filename);
  // let work15 = new Worker(__filename);  
} else {  
  const workerId = require('worker_threads').threadId

  const csv = createCsvStringifier ({    
    header: [
      { id: 'product', title: 'PRODUCT' },
      { id: 'imageName', title: 'IMAGENAME' }, 
      { id: 'color', title: 'COLOR' },
      { id: 'url', title: 'IMAGEURL' },
      { id: 'alt', title: 'ALT COLOR' }
    ]
  });
  
  let count = 1;
  generateFakeData = () => {
    let record = {}
    record.id = count;
    record.product = Math.floor(Math.random() * 1000000) + 1;
    record.imageName = faker.commerce.productName();
    record.color = faker.commerce.color();
    record.url = faker.image.imageUrl();
    record.alt = faker.commerce.color();           
    count++
    return record;
  }
  
  const dataGenerator = (num) => {       
    let records = [];
    for(let i = 0; i < num; i++) {
      let record = generateFakeData()      
      records.push(record)
    }   
    return records;
  }

  
  let time1 = performance.now()
  let testData = dataGenerator(2000000);
  // let dataJSON = JSON.stringify(testData);
  let csvHeader = csv.getHeaderString();
  let csvString = csv.stringifyRecords(testData);
  const stream = fs.createWriteStream(`data/testData${workerId}.csv`);
  stream.write(csvHeader);
  stream.write(csvString);
  stream.end();  
  //csv.writeRecords(dataJSON);
  let time2 = performance.now()
  const time = time2 - time1;
  console.log(`${workerId} took ${time} miliseconds to write ${testData.length} datapoints`)
  
}

