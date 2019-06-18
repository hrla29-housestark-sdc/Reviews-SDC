const data = require('../data.js');
const fs = require('fs');
const fastCSV = require('fast-csv');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

let finalReviews = [];

const seed = () => {
  let currentCount = 1; 
  let countToTen = 0;
  for (let i = 1; i <= 10000000; i++) {
    let target = data[getRandomInt(0, data.length-1)];
    let obj = {};
    if (countToTen >=10) {
      currentCount++;
      countToTen = 0;
    }
    obj.id = i;
    obj.CR_product_id = getRandomInt(0, 1000000);
    obj.createdat = target.createdAt;
    obj.nickName = target.nickName;
    obj.title = target.title;
    obj.body = target.body;
    obj.rating = target.rating;
    obj.fit = target.fit;
    countToTen++;
    finalReviews.push(obj);
  }
};

seed();

// create table reviews(id INTEGER, CR_product_id INTEGER, createdat TEXT, nickName TEXT, title TEXT, body TEXT, rating INTEGER, fit INTEGER, PRIMARY KEY (id))



var wsPostgresProducts = fs.createWriteStream('./newReviews.csv', {tags: 'a'});

fastCSV
.write(finalReviews)
.pipe(wsPostgresProducts)
