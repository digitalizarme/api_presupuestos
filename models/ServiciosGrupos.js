'use strict';

module.exports = (sequelize, DataTypes) => {
  const ServiciosGrupos = sequelize.define('ServiciosGrupos', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    b_activo                    : DataTypes.BOOLEAN,
  }, {
    tableName: 'ServiciosGrupos',
  });
  return ServiciosGrupos;
};