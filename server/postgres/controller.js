const client = require('../../database/postgres/index.js');

const get = (req, res) => {
  const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

  let query = `SELECT * from reviews WHERE "product_id" = 10`;
  client.query(query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
    res.status(200).send(data.rows)
    }
  });
};

const post = (req, res) => {
  let {id, product_id, createdat, nickName, title, body, rating, fit} = req.boy;
  let query = `INSERT INTO TABLE_NAME (id, product_id, createdat, nickName, title, body, rating, fit)
  VALUES (${id}, ${product_id}, ${createdat}, ${nickName}, ${title}, ${body}, ${rating}, ${fit});`
  client.query(query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } 
    res.status(201).send('entry created');
  })
};

const deleteAllData = (req, res) => {
  let query = `delete from reviews`
  client.query(query, (err, data) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(203).send('all data deleted');
  });
};

module.exports = {
  get,
  post,
  deleteAllData 
}