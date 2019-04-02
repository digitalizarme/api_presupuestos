'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cotizaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_monedaOrigemDestino: {
        type: Sequelize.STRING
        ,allowNull: false
        ,validate: {
          notEmpty: false,
          len: {
            args: [6, 6],
          }
        }
      },
      n_valor: {
        type: Sequelize.FLOAT
        ,allowNull: false,
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
    return queryInterface.dropTable('Cotizaciones');
  }
};