'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nominee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.note)
    }
  }
  nominee.init({
    name: DataTypes.STRING,
    league: DataTypes.STRING,
    team: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nominee',
  });
  return nominee;
};