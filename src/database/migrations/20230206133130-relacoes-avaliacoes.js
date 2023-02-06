'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Avaliacoes', {
      fields: ['id_autor'],
      type: 'foreign key',
      name: 'autorFk',
      references: {
        table: 'Colaboradores',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
    await queryInterface.addConstraint('Avaliacoes', {
      fields: ['id_indicacao'],
      type: 'foreign key',
      name: 'indicacoesFk',
      references: {
        table: 'Indicacoes',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Avaliacoes',
      'autorFk'
    )
    await queryInterface.removeConstraint(
      'Avaliacoes',
      'indicacoesFk'
    )
  }
};