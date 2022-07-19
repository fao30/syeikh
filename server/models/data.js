'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Data.belongsTo(models.User, { as: "adminFkId", foreignKey: "admin" });
      Data.belongsTo(models.User, { as: "doctorFkId", foreignKey: "doctorAssigned" });
      Data.belongsTo(models.User, {  as: "creatorFkId", foreignKey: "createdBy" });
      Data.belongsTo(models.User, { as: "updatorFkId", foreignKey: "updateBy" });
      Data.belongsTo(models.User, { as: "doctorReferenceFkId", foreignKey: "doctorReference" });
      Data.belongsTo(models.Data, { as: "visitReferenceFkId", foreignKey: "visitReference" });
      Data.belongsTo(models.Visitor, { foreignKey: "visitorAssigned" });
    }
  };
  Data.init({
    timeVisit: DataTypes.DATE,
    doctorAssigned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    doctorReference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    visitReference: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Data",
        key: "id",
      },
    },
    visitorAssigned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Visitors",
        key: "id",
      },
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdBy:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    updateBy:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    isFirst: DataTypes.BOOLEAN,
    totalSpend: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data',
  });
  return Data;
};