'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Servicios', [
        {
          c_descripcion   : 'SERVICIOS DE PRUEBA',
          c_unidad        : 'UN',
          n_id_grupo      : 1,
          b_activo        : true,
          t_observacion   : 'OBSERVACION DE PRUEBA',
          n_venta         : 1.99,
          n_comision      : 50.01,
          n_iva           : 10,
          n_valor         : 10.10,
          n_id_moneda     : 1,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Servicios', null, {});
  }
};
