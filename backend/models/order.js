'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsToMany(models.Product, { through: models.LineItem })
      Order.belongsToMany(models.ShoppingCart, { through: models.LineItem })
    }
  }
  Order.init({
    subtotal: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    totalDue: DataTypes.INTEGER,
    totalQty: DataTypes.INTEGER,
    paymentTrasaction: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:"Status must not be empty"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg:"UserId must not be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};