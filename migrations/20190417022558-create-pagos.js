'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      n_id_presupuesto: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      n_id_persona_baja: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      n_id_medio_pago: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      n_id_moneda: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      n_valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      d_fecha_pago: {
        allowNull: false,
        type: Sequelize.DATE
      },
      d_fecha_vcto: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Pagos');
  }
};