'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Projetos', {
      fields: ['id_criador'],
      type: 'foreign key',
      name: 'colaboradoresFk',
      references: {
        table: 'Colaboradores',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Projetos',
      'colaboradoresFk'
    )
  }
};