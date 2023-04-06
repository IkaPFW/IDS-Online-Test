'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      transactionDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createBy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createOn: {
        type: Sequelize.DATE,
        allowNull: false
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
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Data');
  }
};