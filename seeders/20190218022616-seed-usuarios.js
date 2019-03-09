'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Usuarios', [
        {
          c_id_persona          : '1',
          c_usuario             : 'rodrigo',
          c_contrasena          : '123456',
          b_activo              : true,
          b_administrador       : true,
          b_cadastrar           : true,
          b_editar              : true,
          b_eliminar            : true,
          b_imprimir            : true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
