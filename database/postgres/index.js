// const Sequelize = require('sequelize');
//hello
const { Pool } = require('pg');
const format = require('pg-format');

const config = {
  host: 'ec2-3-16-90-106.us-east-2.compute.amazonaws.com:3004',
  username: 'ubuntu',
  password: 'password',
  database: 'reviews',
  max: 10,
  // username: 'postgres'
  idleTimeoutMillis: 30000,
  port: 5432
};

const client = new Pool(config);

//get connetion

client.connect()
      .then(() => console.log('connected to postgres'))
      .catch(err => console.log(`connection error ${err}`))

//create table

client.query(`CREATE TABLE IF NOT EXISTS reviews(id INTEGER PRIMARY KEY, product_id INTEGER not null, createdat TEXT, nickName TEXT, title TEXT, body TEXT, rating INTEGER, fit INTEGER)`,
    (err, res) => {
      if (err) {
        console.log(err);
        // client.end();
      } else {
        console.log('data ');
        // client.end();
      }
    }
);

const get = (req, res) => {
  let query = `SELECT * from reviews WHERE "product_id" = 10`;
client.query(query, (err, data) => {
  if (err) {
    res.status(404).send(err);
  } else {
  console.log(data)
  res.status(200).send(data.rows)
  }
});
}


// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });

module.exports = {
  get,
  client
}