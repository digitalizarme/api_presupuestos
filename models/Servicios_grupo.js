'use strict';

module.exports = (sequelize, DataTypes) => {
  const Servicios_grupos = sequelize.define('Servicios_grupos', {
    c_descripcion         : DataTypes.STRING,

  }, {
    tableName: 'servicios_grupos',
  });
  return Servicios_grupos;
};