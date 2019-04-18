'use strict';

module.exports = (sequelize, DataTypes) => {
  const MercaderiasSubGrupos = sequelize.define('MercaderiasSubGrupos', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    b_activo                    : DataTypes.BOOLEAN,
  }, {
    tableName: 'MercaderiasSubGrupos',
  });
  return MercaderiasSubGrupos;
};