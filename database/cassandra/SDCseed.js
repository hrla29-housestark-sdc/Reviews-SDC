const data = require('../data.js');
const fs = require('fs');
const fastCSV = require('fast-csv');
let targetCount = 10000000;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

let cassandrafinalObjs = [];

const seed = () => {
  let currentCount = 1; 
  let countToTen = 0;
  for (let i = 1; i <= targetCount; i++) {
    let target = data[getRandomInt(0, data.length-1)];
    let final = {}
    if (countToTen >=10) {
      currentCount++;
      countToTen = 0;
    }
    final.id = i;
    final.body = target.body;
    final.createdat = target.createdAt;
    final.fit = target.fit;
    final.nickName = target.nickName;
    final.product_id = currentCount
    final.rating = target.rating;
    final.title = target.title;
    countToTen++;
    cassandrafinalObjs.push(final);
    // finalReviews.push(obj);
  }
};

seed();
var wsCassandra = fs.createWriteStream('./reviewsCassandra.csv', {tags: 'a'});
fastCSV
  .write(cassandrafinalObjs)
  .pipe(wsCassandra)
