"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Pagos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      n_id_presupuesto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Presupuestos"
        }
      },
      n_id_persona_baja: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Personas"
        }
      },
      n_id_medio_pago: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "MediosPagos"
        }
      },
      n_id_moneda: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Monedas"
        }
      },
      n_valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      d_fecha_pago: {
        type: Sequelize.DATE
      },
      d_fecha_vcto: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      t_observacion: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable("Pagos");
  }
};
