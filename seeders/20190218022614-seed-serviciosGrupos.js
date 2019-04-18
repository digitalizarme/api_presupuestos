'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ServiciosGrupos', [
        {
          c_descripcion   : 'TODOS',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ServiciosGrupos', null, {});
  }
};
