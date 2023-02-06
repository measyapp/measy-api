'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Avaliacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      id_autor: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_indicacao: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nota: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      comentario: {
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
    await queryInterface.dropTable('Avaliacoes');
  }
};