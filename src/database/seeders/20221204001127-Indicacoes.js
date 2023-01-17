'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Indicacoes', [
      {
        id: 1,
        id_projeto: 1,
        id_metrica: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        id_projeto: 2,
        id_metrica: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Indicacoes', null, {})
  }
};
