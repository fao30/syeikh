'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timeVisit: {
        type: Sequelize.DATE
      },
      doctorAssigned: {
        type: Sequelize.STRING
      },
      visitorAssigned:  {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Visitors",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      admin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdBy: {
        type: Sequelize.STRING
      },
      updateBy: {
        type: Sequelize.STRING
      },
      isFirst: {
        type: Sequelize.BOOLEAN
      },
      totalSpend: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Data');
  }
};