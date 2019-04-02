'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Monedas', [
        {
          c_descripcion : 'GUARANI',
          c_simbolo     : 'Gs',
          c_letras      : 'PYG',
          createdAt     : new Date(),
          updatedAt     : new Date()
        },
        {
          c_descripcion : 'DOLAR',
          c_simbolo     : '$',
          c_letras      : 'USD',
          createdAt     : new Date(),
          updatedAt     : new Date()
        },
        {
          c_descripcion : 'PESO',
          c_simbolo     : 'P$',
          c_letras      : 'ARS',
          createdAt     : new Date(),
          updatedAt     : new Date()
        },
        {
          c_descripcion : 'EURO',
          c_simbolo     : 'EU',
          c_letras      : 'EUR',
          createdAt     : new Date(),
          updatedAt     : new Date()
        },
        {
          c_descripcion : 'REAL',
          c_simbolo     : 'R$',
          c_letras      : 'BRL',
          createdAt     : new Date(),
          updatedAt     : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Monedas', null, {});
  }
};
