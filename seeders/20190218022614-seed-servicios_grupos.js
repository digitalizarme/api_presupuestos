'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Servicios_grupos', [
        {
          c_descripcion: 'Todos',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          c_descripcion: 'Teste',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Servicios_grupos', null, {});
  }
};
