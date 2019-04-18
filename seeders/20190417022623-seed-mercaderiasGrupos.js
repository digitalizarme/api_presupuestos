'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('MercaderiasGrupos', [
        {
          c_descripcion   : 'CEL Y LAPTOP',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'PRENDAS DE VESTIR',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'PERFUMES',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'ELECTRONICOS',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'SUPLEMENTOS',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'TABACOS',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'CUERO (CARTERA,ZAPATOS)',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'JUEGOS ELECTRONICOS (CONSOLAS Y DEMÁS)',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'JUGUETES',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'CULTURA FISICA(DEPORTIVO EN GRAL.)',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'REPUESTOS',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'BIJOUTERIE',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'ART. DECORATIVOS DE HOGAR',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
        {
          c_descripcion   : 'ART. DE COCINA',
          n_id_flete      : 1,
          b_activo        : true,
          createdAt       : new Date(),
          updatedAt       : new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('MercaderiasGrupos', null, {});
  }
};
