const { Pool } = require('pg');
const format = require('pg-format');

const config = {
  host: 'ec2-3-16-124-49.us-east-2.compute.amazonaws.com',
  user: 'ubuntu',
  password: 'password',
  database: 'reviews',
  max: 10,
  idleTimeoutMillis: 30000,
  port: 5432
};

const client = new Pool(config);

//get connetion

client.connect()
      .then(() => console.log('connected to postgres'))
      .catch(err => console.log(`connection error ${err}`))

module.exports = client