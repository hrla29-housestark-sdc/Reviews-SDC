// const Sequelize = require('sequelize');
const { Pool } = require('pg');
const format = require('pg-format');

const config = {
  host: 'ec2-52-15-36-63.us-east-2.compute.amazonaws.com:5432',
  database: 'reviews',
  max: 10,
  // username: 'postgres'
  idleTimeoutMillis: 30000,
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


// const query = client.query(
//   'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', () => { client.end(); });

module.exports = client;