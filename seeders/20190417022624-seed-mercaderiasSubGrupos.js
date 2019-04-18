'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('MercaderiasSubGrupos', [
        {
          c_descripcion   : 'TODOS',
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('MercaderiasSubGrupos', null, {});
  }
};
