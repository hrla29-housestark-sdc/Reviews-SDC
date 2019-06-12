const Sequelize = require('sequelize');

const sequelize = new Sequelize('reviews', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been establish');
  })
  .catch(err => {
    console.error(err);
  });


module.exports = sequelize;