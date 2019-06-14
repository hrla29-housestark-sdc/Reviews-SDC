const client = require('../../database/postgres/index.js');

const get = (req, res) => {
  console.log('hiiii')
  const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};

  let query = `SELECT * from reviews WHERE product_id = 10`;
  client.query(query, (err, data) => {
    console.log(err);
    if (err) {
      res.status(404).send(err);
    } 
    res.status(200).send(data.rows)
  });
};

const post = (req, res) => {
  let { niackName, title, body, rating, fit} = req.body;
  model.create({
    createdat
  })
  .then(() => {
    res.status(201).send('data created');
  })
  .catch(err => {
    res.status(401).send(`error creating ${err}`)
  })
};

const deleteAllData = (req, res) => {
  model.deleteMany({})
    .then(() => {
      res.status(200).send('delete all data');
    })
    .catch(err => res.status(404).send(`error ${err}`))
};

module.exports = {
  get,
  post,
  deleteAllData 
}