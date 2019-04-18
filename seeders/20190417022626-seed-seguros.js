'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Seguros', [
        {
          c_tipo_select2      : '%',
          c_tipo_campo_valor  : '$$',
          n_valor             : 0.030,
          c_valor_exhibir     : '3,0%',
          n_id_moneda         : 2,
          b_activo            : true,
          createdAt           : new Date(),
          updatedAt           : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Seguros', null, {});
  }
};
