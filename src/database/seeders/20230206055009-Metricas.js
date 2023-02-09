'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Metricas', [
      {
        id : 1,
        nome: 'Capacidade de trabalho',
        descricao: 'Avalia a quantidade de itens que uma equipe pode iniciar durante um período.',
        tipo : 'Equipe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 2,
        nome: 'Velocidade (Velocity)',
        descricao: 'Avalia a quantidade de incrementos efetivos realizados por uma equipe durante uma interação',
        tipo : 'Equipe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 3,
        nome: 'Número de desenvolvedores por feature/stories',
        descricao: '"Avalia se o número de desenvolvedores trabalhando sob um mesmo item está de acordo com a carga de trabalho necessária"',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 4,
        nome: 'Progresso, Gráfico de Burndown',
        descricao: 'Avalia o andamento da equipe durante um período de tempo',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 5,
        nome: 'Cobertura de teste unitário por história de usuário',
        descricao: 'Avalia a cobertura de teste código realizar em cada história de usuário',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 6,
        nome: 'Acurácia nas estimativas',
        descricao: 'Avalia se as estimativas da sprint estão de acordo',
        tipo : 'Equipe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 7,
        nome: 'Porcentagem do trabalho adotado',
        descricao: 'Avalia a adição de demandas além do planejado para a sprint',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 8,
        nome: 'Fator foco',
        descricao: 'Avalia a capacidade da equipe de cumprir o compromisso de trabalho feito no início da sprint.',
        tipo : 'Equipe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 9,
        nome: 'Acurácia da previsão futura',
        descricao: 'Avalia se as estimativas da sprint estão de acordo',
        tipo : 'Equipe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 10,
        nome: 'Porcentagem de trabalho descoberto',
        descricao: 'Avalia a adição de demandas não esperadas para a equipe durante a sprint',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 11,
        nome: 'Vazão (Throughput)',
        descricao: 'Avalia a capacidade de vazão das tarefas do projeto',
        tipo : 'Equipe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 12,
        nome: 'WiP - Work in Progress',
        descricao: 'Avalia se a equipe está focada na entrega de valor',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 13,
        nome: 'Satisfação dos clientes',
        descricao: 'Avalia a satisfação do cliente em relação a experiência com a empresa desenvolvedora',
        tipo : 'Organizacional',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 14,
        nome: 'Tempo em processo (Lead Time)',
        descricao: 'Avalia o tempo do card durante os diferentes estágios do processo',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id : 15,
        nome: 'Cycle Time (Cycle time)',
        descricao: 'Avaliar o tempo que passou desde quando o trabalho realmente começou até quando o pedido foi cumprido.',
        tipo : 'Processo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Metricas', null, {});
     
  }
};
