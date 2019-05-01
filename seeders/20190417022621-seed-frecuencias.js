'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Frecuencias', [
        {
          c_descripcion   : 'AL CONTATO',
          n_cantidad_dias : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'SEMANAL',
          n_cantidad_dias : 7,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'QUINCENAL',
          n_cantidad_dias : 15,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'MENSUAL',
          n_cantidad_dias : 30,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'ANUAL',
          n_cantidad_dias : 365,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Frecuencias', null, {});
  }
};
