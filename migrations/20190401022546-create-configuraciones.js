'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Configuraciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_ruc: {
        allowNull: false
        ,unique   : true
        ,type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 30],
          }
        }
      },
      c_email: {
        allowNull: false,
        type     : Sequelize.STRING,
        unique   : true,
        validate : {
          notEmpty: false,
          isEmail: true
        }
      },
      c_tel: {
        type: Sequelize.STRING
      },
      c_razon_social: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 80],
          }
        }
      },
      c_nombre_fantasia: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 80],
          }
        }
      },
      t_logo: {
        type: Sequelize.TEXT
      },
      c_slogan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      c_direccion: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 100],
          }
        }
      },
      n_valor_porcentaje_comision: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      b_comision: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

      },
      b_flete: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false
      },
      b_seguro: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

      },
      t_obs_presup_1: {
        type: Sequelize.TEXT
      },
      t_obs_presup_2: {
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
    return queryInterface.dropTable('Configuraciones');
  }
};