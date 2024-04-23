const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('users', {
  name: DataTypes.STRING,
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  spam: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = {
  User
};
