"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Presupuestos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      n_id_persona: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Personas"
        }
      },
      n_id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Usuarios"
        }
      },
      n_id_persona_comisionista: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Personas"
        }
      },

      n_porc_comisionista: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      n_valor_comision: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      n_id_seguro: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          key: "id",
          model: "Seguros"
        }
      },
      n_tipo_seguro_valor: {
        type: Sequelize.FLOAT
      },
      n_valor_seguro: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      n_id_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Status"
        }
      },
      n_id_moneda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "Monedas"
        }
      },
      n_dias_entrega: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      n_cuotas_pago: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      n_dias_Frecuencia_pago: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      n_desc_redondeo: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      t_observacion: {
        type: Sequelize.TEXT
      },
      b_entregue: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      c_recebido_por: {
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
    return queryInterface.dropTable("Presupuestos");
  }
};
