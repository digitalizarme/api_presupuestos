'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Personas', [
        {
          c_nombre: 'Rodrigo Pereira',
          c_identificacion: '6310337',
          c_email: 'rodrigoyleila@gmail.com',
          c_cel1: '0983668678',
          c_direccion: 'Santa Rita',
          b_activo                    : true,
          b_cliente                   : true,
          b_comisionista              : true,
          b_funcionario               : true,
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
