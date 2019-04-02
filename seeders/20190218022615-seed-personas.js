'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Personas', [
        {
          c_nombre: 'ADMINISTRADOR',
          c_identificacion: '000000000',
          c_email: 'contacto@digitalizar.me',
          c_cel1: '0983668678',
          c_direccion: 'SANTA RITA',
          b_activo                    : true,
          b_cliente                   : false,
          b_comisionista              : false,
          b_funcionario               : false,
          b_usuario                   : true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Personas', null, {});
  }
};
