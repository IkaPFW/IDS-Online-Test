'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let dataDB = JSON.parse(fs.readFileSync('./viewData.json', 'utf-8')).data.map(el => {
      el.statusId = el.status
      delete el.status
      
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })

    return queryInterface.bulkInsert('Data', dataDB, {})
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
    return queryInterface.bulkDelete('Data', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
