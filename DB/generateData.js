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
 
} else {  
  const workerId = require('worker_threads').threadId

  const csv = createCsvStringifier ({    
    header: [
      { id: 'id', title: 'id'},
      { id: 'alt', title: 'alt' },
      { id: 'color', title: 'color' },
      { id: 'imageName', title: 'imagename' }, 
      { id: 'product', title: 'product' },
      { id: 'relatedids', title: 'relatedids' },
      { id: 'url', title: 'url' }
    ]
  });

  let generateRandomIds = () => {
    let ids = '';    
    let randomNum = Math.floor(Math.random() * 8) + 3;    
    for(let i = 0; i < randomNum; i++) {
      let randomId = Math.floor(Math.random() * 10000000) + 1;    
      ids += randomId.toString() + '-';
    }
    return ids.slice(0, -2);
  }
  
  // let count = 1;
  // generateFakeData = () => {
  //   let record = {}
  //   record._id = count;
  //   record.product = Math.floor(Math.random() * 1000000) + 1;
  //   record.imageName = faker.commerce.productName();
  //   record.color = faker.commerce.color();
  //   record.url = faker.image.imageUrl();
  //   record.alt = faker.commerce.color();           
  //   record.relatedids = generateRandomIds();
  //   count++
  //   return record;
  // }
  
  // const dataGenerator = (num) => {       
  //   let records = [];
  //   for(let i = 0; i < num; i++) {
  //     let record = generateFakeData()      
  //     records.push(record)
  //   }   
  //   return records;
  // }
  let count;
  if (workerId === 1) {
    count = 1;   
  }
  if (workerId === 2) {
    count = 2000001;
  }
  if (workerId === 3) {
    count = 4000001;
  }
  if (workerId === 4) {
    count = 6000001;
  }
  if (workerId === 5) {
    count = 8000001;
  }
  let streamWriter = (numImages) => {    
    let time1 = performance.now()
    const stream = fs.createWriteStream(`data/testData${workerId}.csv`);
    let csvHeader = csv.getHeaderString();
    stream.write(csvHeader);
    let num = numImages;    
    const closedWriter = () => {   
      let ok = true;         
      do { 
        num--;         
        let id = count;
        let product = Math.floor(Math.random() * 1000000) + 1;
        let imagename = faker.commerce.productName();
        let color = faker.commerce.color();
        let url = faker.image.imageUrl();
        let alt = faker.commerce.color();           
        let relatedids = generateRandomIds();
        count++;     
        let csvString = `${id},${alt},${color},${imagename},${product},${relatedids},${url}\n`;         
        if (num === 0) {                      
          stream.write(csvString, 'utf8', () => {          
          stream.end();
          let time2 = performance.now()
          const time = time2 - time1;
          console.log(`${workerId} took ${time} miliseconds to write ${count} datapoints`)
          });
        } else {                                    
          ok = stream.write(csvString, 'utf8');          
        }       
        } while (num > 0 && ok);
        if (num > 0) {
          stream.once('drain', closedWriter);
        }
                   
    }    
    closedWriter()
  }

  
  
  streamWriter(2000000);
  
  
  
  
}

