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
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.DATE
      },
      textdesign: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      preferType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      priority: {
        allowNull: false,
        type: Sequelize.STRING
      },
      asset: {
        allowNull: false,
        type: Sequelize.STRING
      },
      example: {
        allowNull: false,
        type: Sequelize.STRING
      },
      collaborator: {
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