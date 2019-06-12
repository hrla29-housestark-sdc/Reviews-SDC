const data = require('../data.js');
const fs = require('fs');
const fastCSV = require('fast-csv');

let header = '';
let targetCount = 10000000;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

const getHeader = (arr) => {
  let target = arr[0];
  let template = '';
  let count = 0;
  for (let key in target) {
    if (count < 5) {
      count++;
      template += key + '|';
    } else {
      template += key;
    }
  };
  // template = template + '\n';
  return template;
};

header = getHeader(data);

const csvEntry = (data) => {
  let final = '';
  let count = 0;
  for (let key in data) {
    if (count < 5) {
      count++;
      if (typeof(data[key]) === 'string' && data[key].includes(',')) {
        let first = `"${data[key]}"|`;
        final += first;
      } else {
        final += data[key] + '|';
      }
    } else {
      final += data[key] + '\n';
      count = 0;
    }
  }
  return final;
};

const createData = (array) => {
  let final = '';
  for (let i = 0; i < 10; i++) {
    final += csvEntry(array[getRandomInt(0, array.length-1)]);
  }
  // return header + '\n' + final;
  return final;
};

// let finalfinal = createData(data, header);
let firstEntry = header + '\n' + createData(data);
// fs.writeFile('dataTest.csv', firstEntry, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('data seeded!!')
//   }
// })

// for (let i = 0; i < 100; i++) {
//   fs.appendFileSync('data.csv', createData(data));
// };

const generate_product_id = (num) => {
  return `${num}`;
}

let pgGbCount = 0;

let products = [];
let customerReviews = [];
let createCSV = () => {
  for (let j = 0; j < targetCount; j++) {
    let target = data[getRandomInt(0, data.length-1)];
    let finalCutomerReviews = {};
    let finalProducts = {};
    finalCutomerReviews.CR_product_id = pgGbCount;
    finalCutomerReviews.body = target.body;
    finalCutomerReviews.createdat = target.createdAt;
    finalCutomerReviews.fit = target.fit;
    finalCutomerReviews.nickName = target.nickName;
    finalCutomerReviews.rating = target.rating;
    finalCutomerReviews.title = target.title;
    finalProducts.product_id = pgGbCount;
    finalProducts.ratings = target.rating;
    finalProducts.createdat = target.createdAt;
    customerReviews.push(finalCutomerReviews);
    // products.push(finalProducts);
    pgGbCount++;
  }
};
createCSV();

var wsPostgresReviews = fs.createWriteStream('./reviewsPg.csv', {tags: 'a'});
var wsPostgresProducts = fs.createWriteStream('./productPg.csv', {tags: 'a'});


fastCSV
  .write(customerReviews)
  .pipe(wsPostgresReviews)

fastCSV
.write(products)
.pipe(wsPostgresProducts)
