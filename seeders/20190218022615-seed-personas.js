'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Personas', [
        {
          c_nombre                    : 'ADMINISTRADOR',
          c_identificacion            : '000000000',
          c_email                     : 'contacto@digitalizar.me',
          c_cel1                      : '0983668678',
          c_direccion                 : 'SANTA RITA',
          b_activo                    : true,
          b_cliente                   : false,
          b_comisionista              : false,
          b_funcionario               : false,
          b_usuario                   : true,
          createdAt                   : new Date(),
          updatedAt                   : new Date(),
        }
        ,{
          c_nombre                    : 'CLIENTE DE PRUEBA',
          c_identificacion            : '123456789',
          c_email                     : 'webmaster@digitalizar.me',
          c_cel1                      : '0983 999 888',
          c_direccion                 : 'SANTA RITA',
          b_activo                    : true,
          b_cliente                   : true,
          b_comisionista              : false,
          b_funcionario               : false,
          b_usuario                   : false,
          createdAt                   : new Date(),
          updatedAt                   : new Date(),
        }
        ,{
          c_nombre                    : 'COMISIONISTA DE PRUEBA',
          c_identificacion            : '58589343',
          c_email                     : 'test@digitalizar.me',
          c_cel1                      : '0983 444 888',
          c_direccion                 : 'SANTA RITA',
          b_activo                    : true,
          b_cliente                   : false,
          b_comisionista              : true,
          n_valor_porcentaje_comision : 70,
          b_funcionario               : false,
          b_usuario                   : false,
          createdAt                   : new Date(),
          updatedAt                   : new Date(),
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Personas', null, {});
  }
};
