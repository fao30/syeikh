'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visitor.hasOne(models.Data, { foreignKey: "visitorAssigned" });
    }
  };
  Visitor.init({
    name: DataTypes.STRING,
    familyName: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    platform: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Visitor',
  });
  return Visitor;
};