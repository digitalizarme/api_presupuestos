
module.exports = (sequelize, DataTypes) => {
  const Configuraciones = sequelize.define('Configuraciones', {
    c_ruc                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_email                     : {
      type     : DataTypes.STRING,
      unique   : true,
      validate : {
        isEmail: true
      }
    },
    c_tel                       : DataTypes.STRING,
    c_razon_social              : DataTypes.STRING,
    c_nombre_fantasia           : DataTypes.STRING,
    t_logo                      : DataTypes.TEXT,
    c_slogan                    : DataTypes.STRING,
    c_direccion                 : DataTypes.STRING,
     n_valor_porcentaje_comision: {
      type     : DataTypes.FLOAT,
      validate : {
        isFloat: true
      }
    },

    b_comision                   : DataTypes.BOOLEAN,
    b_flete                      : DataTypes.BOOLEAN,
    b_seguro                     : DataTypes.BOOLEAN,
    c_obs_presup_1               : DataTypes.TEXT,
    c_obs_presup_2               : DataTypes.TEXT,

  }, {
    tableName: 'Configuraciones',
  });

  return Configuraciones;
};
