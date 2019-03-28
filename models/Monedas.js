'use strict';

module.exports = (sequelize, DataTypes) => {
  const Monedas = sequelize.define('Monedas', {
    c_descripcion         : DataTypes.STRING,
    c_simbolo             : DataTypes.STRING,
    c_letras              : DataTypes.STRING,

  }, {
    tableName: 'monedas',
  });
  return Monedas;
};