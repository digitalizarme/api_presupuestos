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
          n_costo         : 1000,
          n_peso          : 0.05,
          n_iva           : 10,
          n_venta         : 1000000,
          n_id_moneda     : 1,
          b_activo        : true,
          t_observacion   : 'OBSERVACION MERCADERIA DE PRUEBA',
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'MERCADERIA 2 DE PRUEBA',
          c_codigo        : 'QWERTYUI654321',
          c_unidad        : 'UN',
          n_id_marca      : 1,
          n_id_grupo      : 1,
          n_id_subgrupo   : 1,
          n_costo         : 2000,
          n_peso          : 1.05,
          n_iva           : 0,
          n_venta         : 2000000,
          n_id_moneda     : 1,
          b_activo        : true,
          t_observacion   : 'OBSERVACION DE MERCADERIA 2 PRUEBA',
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'MERCADERIA 3 DE PRUEBA',
          c_codigo        : 'JWERTYUI654321',
          c_unidad        : 'UN',
          n_id_marca      : 1,
          n_id_grupo      : 1,
          n_id_subgrupo   : 1,
          n_costo         : 456.12,
          n_peso          : 3.05,
          n_iva           : 0,
          n_venta         : 5000.67,
          n_id_moneda     : 2,
          b_activo        : true,
          t_observacion   : 'OBSERVACION DE MERCADERIA 3 PRUEBA',
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Mercaderias', null, {});
  }
};
