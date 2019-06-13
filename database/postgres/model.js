const connection = require('./index.js');
const Sequelize = require('sequelize');

// const products = connection.define('products', {
//   product_id: {
//     primaryKey: true,
//     type: Sequelize.INTEGER(11),
//     allowNull: false
//   }
// }, {timestamps: false});


const customerReviews = connection.define('customerReviews', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    allowNull: false
  },
  product_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  createdat: {
    type: Sequelize.TEXT,
    allowNull: false, 
  },
  nickName: {
    type: Sequelize.TEXT,
    alowNull: false
  },
  title: {
    type: Sequelize.TEXT,
    alowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    alowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    alowNull: false,
  },
  fit: {
    type: Sequelize.INTEGER,
    alowNull: false
  }
}, {timestamps: false});

// products.hasMany(customerReviews, {foreignKey: 'product_id', sourceKey: 'product_id'});

/*
sync the table with connection
force true will drop the data when it already exist
force false will not
*/
connection.sync({force: false});

module.exports = {
  customerReviews,
};