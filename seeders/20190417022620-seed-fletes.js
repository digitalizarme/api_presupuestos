'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Fletes', [
        {
          c_tipo          : 'KG',
          n_valor         : 28.00,
          n_id_moneda     : 2,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_tipo          : 'CJ',
          n_valor         : 40000,
          n_id_moneda     : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_tipo          : 'BR',
          n_valor         : 200000,
          n_id_moneda     : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Fletes', null, {});
  }
};
