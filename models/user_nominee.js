'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_nominee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_nominee.init({
    userId: DataTypes.INTEGER,
    nomineeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_nominee',
  });
  return user_nominee;
};