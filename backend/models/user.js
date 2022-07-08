'use strict';
const { encryptPwd } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product) //untuk admin
      User.hasMany(models.Order)
      User.hasMany(models.ShoppingCart)
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "User must not be empty"
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email must not be empty"
        },
        isEmail: {
          msg: "Use the email format"
        },
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Password must not be empty"
        }
      }
    },
    salt: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    gender: {
      type: DataTypes.BOOLEAN,
      values: [true, false]
    },
    avatar: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ['Admin', 'Customer'],
      validate: {
        notEmpty: {
          msg: "Type must not be empty"
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.salt = Math.floor(Math.random() * 10) + 1;
        user.password = encryptPwd(user.password, user.salt)
        //user.avatar = user.avatar || ('../images/ppdefault.jpg')

      },
      beforeUpdate: function (user, options) {
        user.salt = Math.floor(Math.random() * 10) + 1;
        user.password = encryptPwd(user.password, user.salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};