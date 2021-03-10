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
    let work6 = new Worker(__filename);  
 
} else {  
  const workerId = require('worker_threads').threadId

  const csv = createCsvStringifier ({    
    header: [
      { id: 'id', title: 'id'},
      { id: 'product_id', title: 'product_id' },     
      { id: 'imageName', title: 'imagename' }, 
      { id: 'color', title: 'color' },
      { id: 'url', title: 'url' },
      { id: 'alt', title: 'alt' },
    ]
  });

  // let generateRandomIds = () => {
  //   let ids = '';    
  //   let randomNum = Math.floor(Math.random() * 8) + 3;    
  //   for(let i = 0; i < randomNum; i++) {
  //     let randomId = Math.floor(Math.random() * 10000000) + 1;    
  //     ids += randomId.toString() + '-';
  //   }
  //   return ids.slice(0, -2);
  // }
  
 
  
  let streamWriterImageTable = (numImages) => {    
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
        let product_id = Math.floor(Math.random() * 1000000) + 1        
        let imagename = faker.commerce.productName();
        let color = faker.commerce.color();
        let url = faker.image.imageUrl();
        let alt = faker.commerce.color();                   
        count++;     
        let csvString = `${id},${product_id},${imagename},${color},${url},${alt}\n`;         
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

  let streamWriterProductTable = (num) => {    
    let time1 = performance.now()
    const stream = fs.createWriteStream(`data/testData${workerId}.csv`);
    //let csvHeader = csv.getHeaderString();
    //stream.write(csvHeader);   
    let productCount = num
    let product_id = 1 
    const closedWriter = () => {   
      let ok = true;         
      do { 
        productCount--;                       
        product_id++;     
        let csvString = `${product_id}\n`;         
        if (productCount === 0) {                      
          stream.write(csvString, 'utf8', () => {          
          stream.end();
          let time2 = performance.now()
          const time = time2 - time1;
          console.log(`${workerId} took ${time} miliseconds to write ${product_id} datapoints`)
          });
        } else {                                    
          ok = stream.write(csvString, 'utf8');          
        }       
        } while (productCount > 0 && ok);
        if (productCount > 0) {
          stream.once('drain', closedWriter);
        }                   
    }    
    closedWriter()
  } 


  
  let count;
  if (workerId === 1) {
    count = 1;   
  }
  if (workerId === 2) {
    count = 5000001;
  }
  if (workerId === 3) {
    count = 10000001;
  }
  if (workerId === 4) {
    count = 15000001;
  }
  if (workerId === 5) {
    count = 20000001;
  }
  if (workerId === 6) {
    streamWriterProductTable(1000000)
  } else {
      streamWriterImageTable(5000000); 
  }
}





