const model = require('../../database/postgres/model.js');

const get = (req, res) => {
  const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max)
  return Math.floor(Math.random() * Math.floor(max - min) + min);
};
  model.customerReviews.findAll({
    where: {
      product_id: getRandomInt(0, 100000)
    },
    limit: 9
  })
    .then((data) => {
      console.log(model.customerReviews, 'hi');
      res.status(200).send(data);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!')
    })
    .catch(err => res.status(404).send(err));
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