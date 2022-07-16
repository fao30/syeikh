'use strict';
const fs = require("fs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync("./data/visitor.json", "utf-8"));
    data.forEach((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });
    return queryInterface.bulkInsert("Visitors", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Visitors", null, {});
  },
};
