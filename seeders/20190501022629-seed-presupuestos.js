'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Presupuestos', [
        {
          n_id_persona              : 1,
          n_id_usuario              : 1,
          n_id_persona_comisionista : 1,
          n_porc_comisionista       : 9.99,
          n_id_seguro               : 1,
          n_id_status               : 1,
          n_id_moneda               : 1,
          n_desc_redondeo           : 0.99,
          n_valor_comision          : 1.99,
          n_tipo_seguro_valor       : 0.03,
          n_valor_seguro            : 1.99,
          n_dias_entrega            : 10,
          n_cuotas_pago             : 1,
          n_dias_Frecuencia_pago    : 1,
          t_observacion             : 'OBSERVACION DE PRESUPUESTOS',
          createdAt                 : new Date(),
          updatedAt                 : new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Presupuestos', null, {});
  }
};
