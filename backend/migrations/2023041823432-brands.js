'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      industry: {
        allowNull: false,
        type: Sequelize.STRING
      },
      audience: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      webaddress: {
        allowNull: false,
        type: Sequelize.DATE
      },
      asset: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      colorcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      font: {
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('requests');
  }
};