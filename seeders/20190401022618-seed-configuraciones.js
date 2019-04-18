'use strict';
const { encrypt } = require('../utils/');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Configuraciones', [
        {
          c_ruc                       : '800111111',
          c_email                     : 'contacto@digitalizar.me',
          c_razon_social              : 'Digitalizar.me',
          c_nombre_fantasia           : 'Digitalizar.me',
          c_slogan                    : 'Porque ya vivimos en la era digital',
          c_direccion                 : 'SANTA RITA',
          n_valor_porcentaje_comision : 70,
          c_tel                       : '0983 668678',
          b_comision                  : true,
          b_flete                     : true,
          b_seguro                    : false,
          t_obs_presup_1              : 'OBS LINEA 1',
          t_obs_presup_2              : 'OBS LINEA 2',
          createdAt                   : new Date(),
          updatedAt                   : new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Configuraciones', null, {});
  }
};
