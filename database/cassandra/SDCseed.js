// const client = require('./SDCindex.js');
// const reviews = require('../data.js');
// const assert = require('assert');

// const getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max)
//   return Math.floor(Math.random() * Math.floor(max - min) + min);
// };

// const seed = () => {
//   for (let i = 0; i < 1000000; i++) {
//     let nickName = reviews[getRandomInt(0, reviews.length-1)].nickName.replace(/\'/g, '\'');
//     let rating = reviews[getRandomInt(0, reviews.length-1)].rating;
//     let title = reviews[getRandomInt(0, reviews.length-1)].title.replace(/\'/g, '\'');
//     let body = reviews[getRandomInt(0, reviews.length-1)].body.replace(/\'/g, '\'');
//     let fit = reviews[getRandomInt(0, reviews.length-1)].fit;
//     console.log(body);
//     // const query = `INSERT INTO customerReviews (id, nickName, rating, title, body, fit) VALUES (now(), '${nickName}', ${rating}, '${title}', '${body}', ${fit})`;
//     // const query = `INSERT INTO customerReviews (id, nickName, rating, title, body, fit) VALUES (now(), 'Jeff Cho', '2', 'ok', 'no', '3')`;
//     // console.log(body, 'here');
//     const query = `INSERT INTO customerReviews (id, nickName, rating, title, body, fit) VALUES (now(), ?, ?, ?, ?, ?)`;
//     client.connect()
//       .then(() => {
//         client.execute(query, [nickName, rating, title, body, fit], (err) => {
//           assert.ifError(err);
//           // console.log('seeded');
//         })
//       })
//       .catch(err => console.log(err));
//   }
// }

// seed();

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
// let cGbCount = 0;

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
// let cassandrafinalObj = [];
// let cGbCount = 0;
// for (let i = 0; i < targetCount; i++) {
//   let target = data[getRandomInt(0, data.length-1)];
//   let final = {}
//   final.id = cGbCount;
//   final.createdat = target.createdAt;
//   final.nickName = target.nickName;
//   final.title = target.title;
//   final.body = target.body;
//   final.rating = target.rating;
//   final.fit = target.fit;
//   cassandrafinalObj.push(final);
//   cGbCount++;
// }

var wsCassandra = fs.createWriteStream('./reviewsCassandra.csv', {tags: 'a'});
fastCSV
  .write(cassandrafinalObjs)
  .pipe(wsCassandra)
