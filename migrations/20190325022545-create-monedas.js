'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Monedas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_descripcion: {
        type: Sequelize.STRING
        ,unique   : true
        ,allowNull: false,
      },
      c_simbolo: {
        type: Sequelize.STRING
        ,unique   : true
        ,allowNull: false,
      },
      n_digitos: {
        type: Sequelize.INTEGER
        ,allowNull: false
        ,defaultValue  : 2
      },
      c_letras: {
        type: Sequelize.STRING
        ,unique   : true
        ,allowNull: false
        ,validate: {
          notEmpty: false,
          len: {
            args: [3, 3],
          }
        }
      },
      b_activo: {
        type: Sequelize.BOOLEAN
        ,allowNull: false
        ,defaultValue  : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Monedas');
  }
};