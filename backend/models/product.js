"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User); //type admin
      Product.hasMany(models.ProductImage);
      Product.belongsToMany(models.Order, { through: models.LineItem });
      Product.belongsToMany(models.ShoppingCart, { through: models.LineItem });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Type must not be empty",
          },
        },
      },
      desc: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price must not be empty",
          },
          min: 1,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Stock must not be empty",
          },
          min: 0,
        },
      },
      expire: DataTypes.DATE,
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Weight must not be empty",
          },
          min: 1,
        },
      },
      category: DataTypes.STRING,
      condition: DataTypes.STRING,
      totalSold: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "User Id must not be empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: function (product, option) {
          product.views = product.views || 0;
          product.totalSold = product.totalSold || 0;
          product.rating = product.rating || Math.floor(Math.random() * 6);
        },
      },
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
