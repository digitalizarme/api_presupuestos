'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Servicios_grupos', [
        {
          c_descripcion: 'TODOS',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          c_descripcion: 'TESTE',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Servicios_grupos', null, {});
  }
};
