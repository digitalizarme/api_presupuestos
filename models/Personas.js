
module.exports = (sequelize, DataTypes) => {
  const Personas = sequelize.define('Personas', {
    c_nombre : DataTypes.STRING,
    c_identificacion  : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_email: {
      type     : DataTypes.STRING,
      unique   : true,
      validate : {
        isEmail: true
      }
    },
    c_tel1                      : DataTypes.STRING,
    c_tel2                      : DataTypes.STRING,
    c_cel1                      : DataTypes.STRING,
    c_cel2                      : DataTypes.STRING,
    c_contacto                  : DataTypes.STRING,
    c_direccion                 : DataTypes.STRING,
     n_valor_porcentaje_comision: {
      type     : DataTypes.FLOAT,
      validate : {
        isFloat: true
      }
    },

    b_activo                    : DataTypes.BOOLEAN,
    b_cliente                   : DataTypes.BOOLEAN,
    b_comisionista              : DataTypes.BOOLEAN,
    b_funcionario               : DataTypes.BOOLEAN,
    b_usuario                   : DataTypes.BOOLEAN,
    t_observacion               : DataTypes.TEXT,
    createdAt                   : DataTypes.DATE,
    updatedAt                   : DataTypes.DATE,

  }, {
    tableName: 'Personas',
  });

  return Personas;
};
