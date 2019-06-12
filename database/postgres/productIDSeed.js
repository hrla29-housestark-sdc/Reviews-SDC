const data = require('../data.js');
const fs = require('fs');
const fastCSV = require('fast-csv');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

let finalProduct = [];
const generateProduct = () => {
  for (let i = 0; i <= 10000005; i++) {
    let product = {
      product_id: i
    };
    finalProduct.push(product);
  }
}

generateProduct();
var wsPostgresProducts = fs.createWriteStream('./productPg.csv', {tags: 'a'});

fastCSV
.write(finalProduct)
.pipe(wsPostgresProducts)