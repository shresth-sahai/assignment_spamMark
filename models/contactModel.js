const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Contact = sequelize.define('Contact', {
  name: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  spam: DataTypes.BOOLEAN,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
});

module.exports = {
  Contact
};
