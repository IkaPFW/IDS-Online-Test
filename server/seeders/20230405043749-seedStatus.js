'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let statusDB = JSON.parse(fs.readFileSync('./viewData.json', 'utf-8')).status.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })

    return queryInterface.bulkInsert('Statuses', statusDB, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
