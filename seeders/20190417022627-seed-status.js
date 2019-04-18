'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Status', [
        {
          c_descripcion       : 'INCOMPLETO',
          b_activo            : true,
          createdAt           : new Date(),
          updatedAt           : new Date()
        },
        {
          c_descripcion       : 'COMPLETO',
          b_activo            : true,
          createdAt           : new Date(),
          updatedAt           : new Date()
        },
        {
          c_descripcion       : 'APROBADO',
          b_activo            : true,
          createdAt           : new Date(),
          updatedAt           : new Date()
        },
        {
          c_descripcion       : 'CONCLUIDO',
          b_activo            : true,
          createdAt           : new Date(),
          updatedAt           : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Status', null, {});
  }
};
