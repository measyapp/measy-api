'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Indicacoes', {
      fields: ['id_metrica'],
      type: 'foreign key',
      name: 'metricasFk',
      references: {
        table: 'Metricas',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Indicacoes',
      'metricasFk'
    )
  }
};
