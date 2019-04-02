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
        ,allowNull: false,
      },
      c_simbolo: {
        type: Sequelize.STRING
        ,allowNull: false,
      },
      c_letras: {
        type: Sequelize.STRING
        ,allowNull: false
        ,validate: {
          notEmpty: false,
          len: {
            args: [3, 3],
          }
        }
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