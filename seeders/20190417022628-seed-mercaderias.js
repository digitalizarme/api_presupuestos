'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Mercaderias', [
        {
          c_descripcion   : 'MERCADERIA DE PRUEBA',
          c_codigo        : 'QWERTYUI123456',
          c_unidad        : 'UN',
          n_id_marca      : 1,
          n_id_grupo      : 1,
          n_id_subgrupo   : 1,
          n_costo         : 1.99,
          n_peso          : 0.05,
          n_iva           : 10,
          n_venta         : 10.10,
          n_id_moneda     : 1,
          b_activo        : true,
          t_observacion   : 'OBSERVACION DE PRUEBA',
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Mercaderias', null, {});
  }
};