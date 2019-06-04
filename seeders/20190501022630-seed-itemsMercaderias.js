"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ItemsMercaderias",
      [
        {
          c_descripcion: "MERCADERIA DE PRUEBA",
          n_id_presupuesto: 1,
          n_cantidad: 1.0,
          n_unitario: 1000000,
          n_exentas: 1000000,
          n_gravadas_5: 0,
          n_gravadas_10: 0,
          n_peso: 1.0,
          n_flete: 100000,
          n_cotizacion: 1.0,
          c_monedaOrigemDestino: "PYG_PYG",
          b_seguro: true,
          t_observacion: "OBSERVACION MERCADERIA DE PRUEBA",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          c_descripcion: "MERCADERIA 2 DE PRUEBA",
          n_id_presupuesto: 1,
          n_cantidad: 1.0,
          n_unitario: 2000000,
          n_exentas: 2000000,
          n_gravadas_5: 0,
          n_gravadas_10: 0,
          n_peso: 1.0,
          n_flete: 200000,
          n_cotizacion: 1.0,
          c_monedaOrigemDestino: "PYG_PYG",
          b_seguro: true,
          t_observacion: "OBSERVACION DE MERCADERIA 2 PRUEBA",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ItemsMercaderias", null, {});
  }
};
