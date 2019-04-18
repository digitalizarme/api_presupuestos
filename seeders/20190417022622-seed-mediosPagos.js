'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('MediosPagos', [
        {
          c_descripcion   : 'DINERO',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'CHEQUE',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'TRANSFERENCIA',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'TARJETA DE CREDITO',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'DEPOSITO BANCARIO',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('MediosPagos', null, {});
  }
};
