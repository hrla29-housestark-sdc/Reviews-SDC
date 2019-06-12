const cassandra = require('cassandra-driver');

const distance = cassandra.types.distance;
// const contactPoints = '127.0.0.1';

const client = new cassandra.Client({
  contactPoints: ['127.0.0.2', '127.0.0.3'], 
  keyspace: 'reviews',
  localDataCenter: 'datacenter1', 
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 2,
      [distance.remote]: 1
    },
    maxRequestsPerConnection: 32768
  }, 
  socketOptions: { readTimeout: 0 }
});

client.connect()
  .then(() => {
    const query = `CREATE KEYSPACE IF NOT EXISTS reviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`;
    return client.execute(query);
  })
  .then(() => {
    const query = `CREATE TABLE IF NOT EXISTS customerReviews(id int, product_id int,createdat text, nickName text, title text, body text, rating int, fit int, PRIMARY KEY(id))`;
    // const query = `CREATE TABLE IF NOT EXISTS customerReviews(id varchar, nickName text, rating int, title text, body text, fit varint, PRIMARY KEY(id))`;
    return client.execute(query);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = client;